const mongoose = require('mongoose');
const Car = mongoose.model('Car');

PersonSchema.pre('remove', function (next) {
	Car.remove({ owner: this._id }).exec();
	next();
});