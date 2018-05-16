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
	//TODO check that the user being deleted is not the current user

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