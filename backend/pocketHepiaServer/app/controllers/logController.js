const mongoose = require('mongoose');
const Log = mongoose.model('Log');
const categories = require('../models/LogCategory');

exports.passwordChange = (req, res) => {
	const entry = new Log({
		category: categories.USER_CHANGE_PASSWORD,
		triggeringUser: req.user._id,
		description: `${req.user.name} changed its password`
	});
	entry.save();
	res.status(200).end();
}


exports.getAllLogs = async (req, res) => {
	try {
		const entries = await Log
			.find()
			.sort({ date: 'desc' })
			.populate('triggeringUser');
		res.json(entries);
	} catch (e) {
		res.sendStatus(500);
	}
}

exports.getCategories = (req, res) => {
	res.json(Object.values(categories));
}