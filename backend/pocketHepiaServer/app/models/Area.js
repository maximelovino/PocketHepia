const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	}
});


if (!AreaSchema.options.toObject) AreaSchema.options.toObject = {};
AreaSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

module.exports = mongoose.model('Area', AreaSchema);