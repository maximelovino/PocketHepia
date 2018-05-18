// TODO missing populate for the areas
const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs');


exports.current = (req, res) => {
	res.json(req.user.toObject());
}

exports.all = async (req, res) => {
	const users = await User.find().sort({ name: 'asc' });
	res.json(users);
}

exports.create = async (req, res, next) => {
	console.log(req.body);
	if (!(req.body.name && req.body.email && req.body.password)) {
		res.sendStatus(400);
		return;
	}

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		isAdmin: req.body.isAdmin,
		isLibrarian: req.body.isLibrarian,
		acceptsPayments: req.body.acceptsPayments,
		canInvite: req.body.canInvite,
		isAuditor: req.body.isAuditor
	});
	// TODO use promise
	User.register(user, req.body.password, (err, account) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			req.newUser = account;
			next();
		}
	});
}

exports.delete = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
		return;
	}

	if (req.params.id == req.user._id) {
		res.sendStatus(400);
		return;
	}

	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) {
		res.sendStatus(404);
		return;
	}

	req.oldUser = user;
	next();
}

exports.resetPassword = async (req, res, next) => {
	if (!req.params.id || req.body.password !== req.body.password2) {
		res.status(400);
		res.send("New passwords don't match");
		return;
	}

	const user = await User.findById(req.params.id);

	if (!user) {
		res.sendStatus(404);
	}

	req.affectedUser = user;

	user.setPassword(req.body.password).then(() => {
		user.save();
		next();
	}).catch(e => {
		console.error(e);
		res.status(500);
		res.send(e.message);
	})
}

exports.changePermissions = async (req, res, next) => {
	if (!req.params.id) {
		res.status(400);
		res.send("You didn't specify the user");
		return;
	}

	// If one of them is not defined, we assume it as false
	const isLibrarian = req.body.isLibrarian == undefined ? false : req.body.isLibrarian;
	const acceptsPayments = req.body.acceptsPayments == undefined ? false : req.body.acceptsPayments;
	const isAdmin = req.body.isAdmin == undefined ? false : req.body.isAdmin;
	const isAuditor = req.body.isAuditor == undefined ? false : req.body.isAuditor;
	const canInvite = req.body.canInvite == undefined ? false : req.body.canInvite;

	if (req.params.id == req.user.id && !isAdmin) {
		res.status(400);
		res.send("You can't remove your admin rights");
		return;
	}

	const oldUser = await User.findByIdAndUpdate(req.params.id, { isLibrarian, acceptsPayments, isAdmin, isAuditor, canInvite });
	if (!oldUser) {
		res.sendStatus(500);
	}
	const newUser = await User.findById(req.params.id);

	if (!newUser) {
		res.sendStatus(500);
	}

	req.rawData = { oldUser: oldUser.toObject(), newUser: newUser.toObject() };

	next();

}

exports.import = async (req, res, next) => {
	console.log(req.body);
	console.log(req.file);

	const content = fs.readFileSync(req.file.path, { encoding: "utf-8" });
	const lines = content.split('\n').map(line => line.trim());
	const headers = lines[0];
	const usersLines = lines.slice(1);

	console.log(headers);
	console.log(usersLines);

	const headersFields = headers.split(',');
	console.log(headersFields);

	const headersIndexes = {
		name: headersFields.findIndex(v => v == 'name'),
		email: headersFields.findIndex(v => v == 'email'),
		password: headersFields.findIndex(v => v == 'password'),
		isAdmin: headersFields.findIndex(v => v == 'isAdmin'),
		isLibrarian: headersFields.findIndex(v => v == 'isLibrarian'),
		acceptsPayments: headersFields.findIndex(v => v == 'acceptsPayments'),
		canInvite: headersFields.findIndex(v => v == 'canInvite'),
		isAuditor: headersFields.findIndex(v => v == 'isAuditor'),
	}

	if (Object.values(headersIndexes).includes(-1)) {
		res.status(400);
		res.send("The file headers are incomplete");
		return;
	}

	console.log(headersIndexes);

	const users = usersLines.map((lineContent, index) => {
		// TODO for each line create a user model
		const line = lineContent.split(',');
		if (line.length === headersFields.length) {
			return new User({
				email: line[headersIndexes.email],
				name: line[headersIndexes.name],
				isAdmin: line[headersIndexes.isAdmin],
				isLibrarian: line[headersIndexes.isLibrarian],
				acceptsPayments: line[headersIndexes.acceptsPayments],
				canInvite: line[headersIndexes.canInvite],
				isAuditor: line[headersIndexes.isAuditor]
			});
		} else {
			return undefined;
		}
	});

	console.log(users);

	let doneUsers = []
	let failedUsers = []

	users.forEach(async (us, index) => {
		try {
			const account = await User.register(us, usersLines[index].split(',')[headersIndexes.password])
			doneUsers.push({ line: index, user: us });
		} catch (error) {
			failedUsers.push({ line: index, user: us });
		}
	});

	console.log(doneUsers);
	console.log("########");
	console.log(failedUsers);

	next()
}