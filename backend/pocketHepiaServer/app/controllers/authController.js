const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken')

//TODO this is to create a user, must take into consideration all other params
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
	const user = req.user.exportForFrontend();
	const token = jwt.sign(req.user.toObject(), process.env.JWT_SECRET);
	res.json({ user, token });
};