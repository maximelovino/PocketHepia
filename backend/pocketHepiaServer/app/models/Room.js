const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	area: {
		type: Schema.Types.ObjectId,
		ref: 'Area',
		required: true
	},
	accessReaders: {
		type: [String],
		required: true,
		default: []
	}
});


if (!RoomSchema.options.toObject) RoomSchema.options.toObject = {};
RoomSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

module.exports = mongoose.model('Room', RoomSchema);