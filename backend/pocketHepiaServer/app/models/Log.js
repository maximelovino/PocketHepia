const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('./LogCategory');

const LogSchema = new Schema({
	category: {
		type: String,
		enum: Object.values(categories),
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	triggeringUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = mongoose.model('Log', LogSchema);