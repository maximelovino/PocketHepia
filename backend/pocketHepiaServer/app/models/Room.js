const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Access = mongoose.model('Access');


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

RoomSchema.pre('remove', function (next) {
	console.log(`Room pre hook for ${this.name}`);
	Access.remove({ room: this._id }).exec();
	next();
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