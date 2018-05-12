// TODO missing populate for the areas
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.current = (req, res) => {
	res.json(req.user.toObject());
}

exports.all = async (req, res) => {
	const users = await User.find().sort({ name: 'asc' });
	res.json(users);
}