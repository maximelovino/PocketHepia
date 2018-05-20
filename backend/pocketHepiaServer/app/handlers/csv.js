const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs');
const uuid = require('uuid/v1')

exports.parseUsers = (req, res, next) => {
	if (!req.file) {
		res.status(400);
		res.send("You didn't upload any file");
		return;
	}

	const content = fs.readFileSync(req.file.path, { encoding: "utf-8" });
	const lines = content.split('\n').map(line => line.trim());
	const headers = lines[0];
	const usersLines = lines.slice(1);

	const headersFields = headers.split(',');

	const headersIndexes = {
		name: headersFields.findIndex(v => v === 'name'),
		email: headersFields.findIndex(v => v === 'email'),
		password: headersFields.findIndex(v => v === 'password'),
		isAdmin: headersFields.findIndex(v => v === 'isAdmin'),
		isLibrarian: headersFields.findIndex(v => v === 'isLibrarian'),
		acceptsPayments: headersFields.findIndex(v => v === 'acceptsPayments'),
		canInvite: headersFields.findIndex(v => v === 'canInvite'),
		isAuditor: headersFields.findIndex(v => v === 'isAuditor'),
	}

	if (Object.values(headersIndexes).includes(-1)) {
		res.status(400);
		res.send("The file headers are incomplete");
		return;
	}

	console.log(headersIndexes);

	req.importBatch = uuid();

	const users = usersLines.map((lineContent) => {
		const line = lineContent.split(',');
		if (line.length === headersFields.length) {
			return {
				user: new User({
					email: line[headersIndexes.email],
					name: line[headersIndexes.name],
					isAdmin: line[headersIndexes.isAdmin],
					isLibrarian: line[headersIndexes.isLibrarian],
					acceptsPayments: line[headersIndexes.acceptsPayments],
					canInvite: line[headersIndexes.canInvite],
					isAuditor: line[headersIndexes.isAuditor],
					importBatch: req.importBatch,
				}),
				password: line[headersIndexes.password]
			};
		} else {
			return undefined;
		}
	});

	req.users = users;

	next();
}