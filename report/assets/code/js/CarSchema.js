const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Person',
		required: true
	},
	brand: {
		type: String,
		required: true,
		trim: true
	},
	model: {
		type: String,
		required: true,
		trim: true
	},
	plate: {
		type: String,
		required: true,
		trim: true
	},
});

module.exports = mongoose.model('Car', CarSchema);