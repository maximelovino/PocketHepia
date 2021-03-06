const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
		required: true
	},
	startDate: {
		type: Date,
		required: true,
		default: Date.now
	},
	endDate: {
		type: Date,
		required: false,
	},
	startTime: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
		max: 24 * 60 - 2
	},
	endTime: {
		type: Number,
		required: true,
		default: 24 * 60 - 1,
		min: 1,
		max: 24 * 60 - 1,
	},
});


AccessSchema.pre('validate', function (next) {
	if (this.startDate > this.endDate || this.startTime >= this.endTime) {
		next(new Error('Problem with timing of the access'));
	} else {
		next();
	}
});

if (!AccessSchema.options.toObject) AccessSchema.options.toObject = {};
AccessSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	ret.startDate = ret.startDate.getTime()
	if (ret.endDate) {
		ret.endDate = ret.endDate.getTime()
	}
	delete ret._id;
	delete ret.__v;
	return ret;
}

module.exports = mongoose.model('Access', AccessSchema);