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

exports.userDeletion = (req, res) => {
	const oldUser = req.oldUser.toObject();
	const entry = new Log({
		category: categories.USER_DELETED,
		triggeringUser: req.user._id,
		description: `${req.user.name} has deleted user "${oldUser.name}"`,
		rawData: oldUser,
	});

	entry.save();
	res.status(200).end();
}

exports.resetPassword = (req, res) => {
	const user = req.affectedUser.toObject();
	const entry = new Log({
		category: categories.ADMIN_CHANGE_PASSWORD,
		triggeringUser: req.user._id,
		description: `${req.user.name} has reset the password for user "${user.name}"`,
		rawData: user,
	});

	entry.save();
	res.status(200).end();
}

exports.changePermissions = (req, res) => {
	const data = req.rawData;
	const entry = new Log({
		category: categories.ADMIN_CHANGE_PERMISSION,
		triggeringUser: req.user._id,
		description: `${req.user.name} has changed permissions for user "${data.oldUser.name}"`,
		rawData: data,
	});

	entry.save();
	res.status(200).end();
}

exports.importUsers = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_IMPORT_USERS,
		triggeringUser: req.user._id,
		description: `${req.user.name} has imported ${req.doneUsers.length} users`,
		rawData: { batch: req.importBatch, successful: req.doneUsers, failed: req.failedUsers },
	});
	entry.save();
	res.status(200);
	res.send(JSON.stringify({
		importBatch: req.importBatch,
		doneCount: req.doneUsers.length,
		failedCount: req.failedUsers.length
	}));
}

exports.undoImport = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_UNDO_IMPORT,
		triggeringUser: req.user._id,
		description: `${req.user.name} has cancelled import ${req.params.id}`,
		rawData: { batch: req.params.id },
	});
	entry.save();
	res.status(200).end();
}

exports.assignTag = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_ASSIGN_TAG,
		triggeringUser: req.user._id,
		description: `${req.user.name} has assigned tag to ${req.affectedUser.name}`,
		rawData: { affectedUser: req.affectedUser },
	});
	entry.save();
	res.status(200).end();
}

exports.removeTag = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_REMOVED_TAG,
		triggeringUser: req.user._id,
		description: `${req.user.name} has removed tag of ${req.affectedUser.name}`,
		rawData: { affectedUser: req.affectedUser },
	});
	entry.save();
	res.status(200).end();
}

exports.addToBalance = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_ADD_BALANCE,
		triggeringUser: req.user._id,
		description: `${req.user.name} has added ${req.transaction.amount} to the balance of ${req.affectedUser.name}`,
		rawData: { affectedUser: req.affectedUser, transaction: req.transaction },
	});
	entry.save();
	res.status(200).end();
}

exports.createArea = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_CREATES_AREA,
		triggeringUser: req.user._id,
		description: `${req.user.name} has created area ${req.area.name}`,
		rawData: { area: req.area },
	});
	entry.save();
	res.status(200).end();
}

exports.createRoom = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_CREATES_ROOM,
		triggeringUser: req.user._id,
		description: `${req.user.name} has created room ${req.room.name}`,
		rawData: { area: req.area, room: req.room },
	});
	entry.save();
	res.status(200).end();
}

exports.deleteRoom = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_DELETES_ROOM,
		triggeringUser: req.user._id,
		description: `${req.user.name} has deleted room ${req.room.name}`,
		rawData: { room: req.room },
	});
	entry.save();
	res.status(200).end();
}


exports.deleteArea = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_REMOVES_AREA,
		triggeringUser: req.user._id,
		description: `${req.user.name} has deleted area ${req.area.name}`,
		rawData: { area: req.area },
	});
	entry.save();
	res.status(200).end();
}

exports.giveAccess = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_GIVES_ACCESS,
		triggeringUser: req.user._id,
		description: `${req.user.name} gave access to  ${req.room.name} to user ${req.accessUser.name}`,
		rawData: { access: req.access, room: req.room, user: req.accessUser },
	});
	entry.save();
	res.status(200).end();
}

exports.deleteAccess = (req, res) => {
	const entry = new Log({
		category: categories.ADMIN_REMOVES_ACCESS,
		triggeringUser: req.user._id,
		description: `${req.user.name} deleted an access to ${req.access.room.name} for user ${req.access.user.name}`,
		rawData: { access: req.access },
	});
	entry.save();
	res.status(200).end();
}


