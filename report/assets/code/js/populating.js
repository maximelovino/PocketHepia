const mongoose = require('mongoose');
const Car = mongoose.model('Car');

const entries = await Car.find().populate('owner');
//entries contains all Cars with the full Person in the 'owner' field