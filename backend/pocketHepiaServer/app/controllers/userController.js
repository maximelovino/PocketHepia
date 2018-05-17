// TODO missing populate for the areas
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.current = (req, res) => {
	res.json(req.user.toObject());
}

exports.all = async (req, res) => {
	const users = await User.find().sort({ name: 'asc' });
	res.json(users);
}

exports.create = async (req, res, next) => {
	console.log(req.body);
	if (!(req.body.name && req.body.email && req.body.password)) {
		res.sendStatus(400);
		return;
	}

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		isAdmin: req.body.isAdmin,
		isLibrarian: req.body.isLibrarian,
		acceptsPayments: req.body.acceptsPayments,
		canInvite: req.body.canInvite,
		isAuditor: req.body.isAuditor
	});
	// TODO use promise
	User.register(user, req.body.password, (err, account) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			req.newUser = account;
			next();
		}
	});
}

exports.delete = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
		return;
	}

	if (req.params.id == req.user._id) {
		res.sendStatus(400);
		return;
	}

	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) {
		res.sendStatus(404);
		return;
	}

	req.oldUser = user;
	next();
}

exports.resetPassword = async (req, res, next) => {
	if (!req.params.id || req.body.password !== req.body.password2) {
		res.status(400);
		res.send("New passwords don't match");
		return;
	}

	const user = await User.findById(req.params.id);

	if (!user) {
		res.sendStatus(404);
	}

	req.affectedUser = user;

	user.setPassword(req.body.password).then(() => {
		user.save();
		next();
	}).catch(e => {
		console.error(e);
		res.status(500);
		res.send(e.message);
	})
}

exports.changePermissions = async (req, res, next) => {
	if (!req.params.id) {
		res.status(400);
		res.send("You didn't specify the user");
		return;
	}

	// If one of them is not defined, we assume it as false
	const isLibrarian = req.body.isLibrarian == undefined ? false : req.body.isLibrarian;
	const acceptsPayments = req.body.acceptsPayments == undefined ? false : req.body.acceptsPayments;
	const isAdmin = req.body.isAdmin == undefined ? false : req.body.isAdmin;
	const isAuditor = req.body.isAuditor == undefined ? false : req.body.isAuditor;
	const canInvite = req.body.canInvite == undefined ? false : req.body.canInvite;

	if (req.params.id == req.user.id && !isAdmin) {
		res.status(400);
		res.send("You can't remove your admin rights");
		return;
	}

	const oldUser = await User.findByIdAndUpdate(req.params.id, { isLibrarian, acceptsPayments, isAdmin, isAuditor, canInvite });
	if (!oldUser) {
		res.sendStatus(500);
	}
	const newUser = await User.findById(req.params.id);

	if (!newUser) {
		res.sendStatus(500);
	}

	req.rawData = { oldUser: oldUser.toObject(), newUser: newUser.toObject() };

	next();

}