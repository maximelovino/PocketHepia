const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose')
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please supply a name'
	},
	email: {
		type: String,
		lowercase: true,
		required: 'Please Supply an email address',
		unique: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid email address']
	},
	role: {
		type: Number,
		required: true,
		default: 0
	},
	cardId: {
		type: String,
		required: false,
		unique: true
	},
	balance: {
		type: Number,
		required: true,
		default: 0
	}
});

UserSchema.plugin(passportMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);