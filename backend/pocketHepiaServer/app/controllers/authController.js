const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.register = (req, res, next) => {
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
			next();
		}
	})
}

exports.login = passport.authenticate('local');