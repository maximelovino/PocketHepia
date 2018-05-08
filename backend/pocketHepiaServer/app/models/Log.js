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


if (!LogSchema.options.toObject) LogSchema.options.toObject = {};
LogSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

module.exports = mongoose.model('Log', LogSchema);