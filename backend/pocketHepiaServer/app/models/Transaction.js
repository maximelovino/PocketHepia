const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO add stripe token string field required false 
const TransactionSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	},
	from: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	},
	to: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	stripe: {
		type: Boolean,
		required: true,
		default: false
	},
	adminCharge: {
		type: Boolean,
		required: true,
		default: false
	}
});

if (!TransactionSchema.options.toObject) TransactionSchema.options.toObject = {};
TransactionSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	ret.date = ret.date.getTime()
	delete ret._id;
	delete ret.__v;
	return ret;
}

module.exports = mongoose.model('Transaction', TransactionSchema);