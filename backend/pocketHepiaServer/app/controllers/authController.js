const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken')

//TODO this is to register a user, must take into consideration all other params
// TODO merge with create in userController
exports.register = (req, res) => {
	if (!(req.body.name && req.body.email && req.body.password)) {
		res.sendStatus(400);
		return;
	}
	const user = new User({ email: req.body.email, name: req.body.name });
	User.register(user, req.body.password, (err, account) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json(account.exportForFrontend());
		}
	})
}

exports.login = (req, res) => {
	console.log("New login:")
	console.log(req.user.toObject());
	const user = req.user.toObject();
	const token = jwt.sign(req.user.toObject(), process.env.JWT_SECRET);
	res.json({ token });
};

exports.changePassword = (req, res, next) => {
	console.log("Hello");
	if (!(req.body.oldPassword && req.body.password && req.body.password2) || req.body.password !== req.body.password2) {
		res.status(400);
		res.send("New passwords don't match");
		return;
	}

	// TODO change this to promise
	User.findById(req.user._id, (err, user) => {
		if (!err && user) {
			user.changePassword(req.body.oldPassword, req.body.password).then(() => {
				user.save();
				next();
			}).catch(e => {
				console.error(e);
				res.status(400);
				res.send(e.message);
			})
		} else {
			res.sendStatus(400);
		}
	})
}

exports.checkAdmin = (req, res, next) => {
	if (!req.user.isAdmin) {
		res.sendStatus(403);
		return;
	}
	next();
}

exports.checkAcceptPayment = (req, res, next) => {
	if (!req.user.acceptsPayments) {
		res.sendStatus(403);
		return;
	}
	next();
}

exports.initFirstAdmin = async (req, res) => {
	const users = await User.count();
	if (users > 0) {
		res.status(400);
		res.send("You can't initialize the server if it's already been initiated");
		return;
	}
	const email = "root@pockethepia.maximelovino.ch"
	const password = "root"
	const user = new User({ email: email, name: "Default Root Account", isAdmin: true });
	User.register(user, password, (err, account) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			res.json({ email, password });
		}
	})
}