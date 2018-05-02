const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose')
const validator = require('validator');
const Schema = mongoose.Schema;
const FrontEndUser = require("./FrontEndUser")

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
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	cardId: {
		type: String,
		required: false
	},
	balance: {
		type: Number,
		required: true,
		default: 0
	},
	isLibrarian: {
		type: Boolean,
		required: true,
		default: false
	},
	acceptsPayments: {
		type: Boolean,
		required: true,
		default: false
	},
	adminForAreas: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: []
	},
	expiration: {
		type: Date,
		required: false
	},
	canInvite: {
		type: Boolean,
		required: true,
		default: false
	}
});


UserSchema.methods.exportForFrontend = function () {
	return new FrontEndUser(this.name, this.email, this.isAdmin, this.cardId, this.balance, this.isLibrarian, this.acceptsPayments, this.adminForAreas, this.canInvite)
}

UserSchema.plugin(passportMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);