const passport = require('passport');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = mongoose.model('User');

passport.use(User.createStrategy());

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, (payload, done) => {
	console.log("PAYLOAD")
	console.log(payload.id);
	User.findById(payload.id, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			console.log(user);
			done(null, user);
		} else {
			done(null, false);
		}
	})
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());