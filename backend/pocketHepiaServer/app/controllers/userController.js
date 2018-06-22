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

	const user = await User.findById(req.params.id);

	if (!user) {
		res.sendStatus(404);
		return;
	}

	await user.remove();

	req.oldUser = user;
	next();
}

exports.resetPassword = async (req, res, next) => {
	//TODO this test is wrong, we don't check that the passwords are set, they may be both undefined and it will work CHANGE THIS, THIS SHOULD DO IT
	if (!(req.params.id && req.body.password && req.body.password2) || req.body.password !== req.body.password2) {
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
		return;
	}
	const newUser = await User.findById(req.params.id);

	if (!newUser) {
		res.sendStatus(500);
		return;
	}

	req.rawData = { oldUser: oldUser.toObject(), newUser: newUser.toObject() };

	next();

}

exports.import = async (req, res, next) => {

	//Only defined users
	const users = req.users.filter(us => us);

	let doneUsers = [];
	// All undefined users
	let failedUsers = req.users.filter(us => !us);



	const promises = users.map((us, index) => {
		return User.register(us.user, us.password).catch(() => failedUsers.push({ line: index, user: us.user.toObject() }));
	});

	const results = await Promise.all(promises);
	doneUsers = results.filter((value, index) => !failedUsers.map(u => u.line).includes(index))

	req.doneUsers = doneUsers;
	req.failedUsers = failedUsers;
	next()
}

exports.undoImport = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
		return;
	}
	await User.deleteMany({ importBatch: req.params.id })

	next();
}

exports.assignTag = async (req, res, next) => {
	if (!req.body.tagID || !req.body.userID) {
		res.sendStatus(400);
		return;
	}

	try {
		const alreadyAssigned = await User.findOne({ cardId: req.body.tagID })


		if (alreadyAssigned) {
			res.status(500)
			res.send(`Tag already assigned to ${alreadyAssigned.name}`)
			return;
		}

		const oldUser = await User.findByIdAndUpdate(req.body.userID, { cardId: req.body.tagID })

		if (!oldUser) {
			res.sendStatus(500);
			return;
		}
		const newUser = await User.findById(req.body.userID);

		if (!newUser) {
			res.sendStatus(500);
			return;
		}
		req.affectedUser = newUser
		next()
	} catch (e) {
		res.sendStatus(500);
	}
}

exports.removeTag = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
		return;
	}

	try {

		const oldUser = await User.findByIdAndUpdate(req.params.id, { $unset: { cardId: "" } })

		if (!oldUser) {
			console.log("No old user");
			res.sendStatus(500);
			return;
		}
		const newUser = await User.findById(req.params.id);

		if (!newUser) {
			console.log("No new user");
			res.sendStatus(500);
			return;
		}
		req.affectedUser = newUser
		next()
	} catch (e) {
		console.log("Exception");
		console.log(e)
		res.sendStatus(500);
	}
}