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
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	cardId: {
		type: String,
		required: false
	},
	virtualCard: {
		type: String,
		required: false
	},
	balance: {
		type: Number,
		required: true,
		min: [0, 'No negative balance'],
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
	//TODO add ref
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
	},
	isAuditor: {
		type: Boolean,
		required: true,
		default: false
	},
	importBatch: {
		type: String
	}
});


if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

UserSchema.plugin(passportMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);