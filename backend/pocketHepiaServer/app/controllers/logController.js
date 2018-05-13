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


exports.getLogs = async (req, res) => {
	if (!(req.params.startDate && req.params.endDate)) {
		res.sendStatus(400);
		return;
	}
	// passed parameters are milliseconds
	const start = new Date(parseInt(req.params.startDate));
	const end = new Date(parseInt(req.params.endDate));
	// TODO check that start < end => 400
	console.log(start.toLocaleString())
	console.log(end.toLocaleString())
	try {
		const entries = await Log.find({
			date: {
				"$gte": start,
				"$lte": end
			}
		}).sort({ date: 'desc' }).populate('triggeringUser');
		res.json(entries);
	} catch (e) {
		res.sendStatus(500);
	}

}

exports.userCreation = (req, res) => {
	const newUser = req.newUser.toObject();
	delete newUser.salt;
	delete newUser.hash;
	const entry = new Log({
		category: categories.USER_CREATION,
		triggeringUser: req.user._id,
		description: `${req.user.name} has created user "${newUser.name}"`,
		rawData: newUser,
	});
	entry.save();
	res.status(200).end();
}