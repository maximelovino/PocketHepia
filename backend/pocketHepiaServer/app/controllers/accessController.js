const mongoose = require('mongoose');
const Access = mongoose.model('Access');
const Room = mongoose.model('Room');
const Area = mongoose.model('Area');
const User = mongoose.model('User');

exports.createArea = async (req, res, next) => {
	if (!req.body.name) {
		res.status(400);
		res.send("You have to provide a name for the area");
		return;
	}

	const area = new Area({
		name: req.body.name
	});

	try {
		await area.save()
		req.area = area;
		next()
	} catch (e) {
		res.status(500);
		res.send("The name of the area is already taken")
	}
}

exports.createRoom = async (req, res, next) => {
	// TODO assign reader after room creation one by one
	if (!(req.body.name && req.body.areaID)) {
		res.status(400);
		res.send("You have to provide a name and areaID for the room");
		return;
	}


	const area = await Area.findById(req.body.areaID)

	if (!area) {
		res.status(404);
		res.send("The area doesn't exist");
		return;
	}

	const room = new Room({
		name: req.body.name,
		area: area._id
	})

	try {
		await room.save()
		req.area = area;
		req.room = room;
		next()
	} catch (e) {
		res.status(500);
		res.send("There was a problem creating the room")
	}
}


exports.getAreas = async (req, res) => {
	const areas = await Area.find()

	const toReturn = areas.map(a => a.toObject());

	res.json(toReturn)
}


exports.getRooms = async (req, res) => {
	const rooms = await Room.find().populate('area')

	const toReturn = rooms.map(r => r.toObject());

	res.json(toReturn)
}

exports.getRoom = async (req, res) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}
	const room = await Room.findById(req.params.id).populate('area')

	if (!room) {
		res.sendStatus(404);
		return;
	}

	const toReturn = room.toObject();

	res.json(toReturn)
}

exports.deleteArea = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}
	const area = await Area.findById(req.params.id);

	if (!area) {
		res.sendStatus(404);
		return;
	}

	await area.remove();

	req.area = area;

	next()
}

exports.deleteRoom = async (req, res, next) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}
	const room = await Room.findById(req.params.id);

	if (!room) {
		res.sendStatus(404);
		return;
	}

	await room.remove();

	req.room = room;

	next()
}

exports.deleteAccess = async (req, res, next) => {
	//TODO if we want to populate, we have to find it first and then do a findAndremove
	if (!req.params.id) {
		res.sendStatus(400);
	}
	const access = await Access.findByIdAndRemove(req.params.id).populate('user').populate('room');

	if (!access) {
		res.sendStatus(404);
		return;
	}

	req.access = access;

	next()
}

exports.giveAccess = async (req, res, next) => {
	if (!(req.body.userID && req.body.roomID)) {
		res.status(400);
		res.send("You have to specify at least an user ID and a room ID")
	}

	const room = await Room.findById(req.body.roomID)

	if (!room) {
		res.status(404);
		res.send("The room doesn't exist");
		return;
	}

	const user = await User.findById(req.body.userID)

	if (!user) {
		res.status(404);
		res.send("The user doesn't exist");
		return;
	}

	const access = new Access({
		user: user._id,
		room: room._id
	})


	if (req.body.startDate) {
		const start = new Date(parseInt(req.body.startDate));
		access.startDate = start
	}

	if (req.body.endDate) {
		const end = new Date(parseInt(req.body.endDate));
		access.endDate = end
	}

	if (req.body.startTime) {
		const startTime = parseInt(req.body.startTime);
		access.startTime = startTime
	}

	if (req.body.endTime) {
		const endTime = parseInt(req.body.endTime);
		access.endTime = endTime
	}

	try {
		await access.save();
		req.access = access;
		req.accessUser = user;
		req.room = room;
		next()
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}

}

exports.getAccessesForRoom = async (req, res) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}

	const accesses = await Access.find({ room: req.params.id }).populate({
		path: 'room',
		populate: { path: 'area' }
	}).populate('user')

	const toReturn = accesses.map(a => a.toObject());

	res.json(toReturn)
}

exports.getAccessesForUser = async (req, res) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}

	const accesses = await Access.find({ user: req.params.id }).populate({
		path: 'room',
		populate: { path: 'area' }
	}).populate('user')

	const toReturn = accesses.map(a => a.toObject());

	res.json(toReturn)

}

exports.getMyAccesses = async (req, res) => {
	const accesses = await Access.find({ user: req.user._id }).populate({
		path: 'room',
		populate: { path: 'area' }
	}).populate('user')

	const toReturn = accesses.map(a => a.toObject());

	res.json(toReturn)
}

exports.createReaderForRoom = async (req, res) => {
	if (!(req.body.identifier && req.body.roomID)) {
		res.sendStatus(400);
		return;
	}

	const room = await Room.findByIdAndUpdate(req.body.roomID, { $push: { accessReaders: req.body.identifier } });

	if (room) {
		res.status(200).end();
	} else {
		res.sendStatus(404);
	}
}
exports.getReadersForRoom = async (req, res) => {
	if (!req.params.id) {
		res.sendStatus(400);
		return;
	}

	const room = await Room.findById(req.params.id);

	if (room) {
		res.json(room.accessReaders);
	} else {
		res.sendStatus(404);
	}
}
exports.deleteReader = async (req, res) => {
	if (!(req.params.roomID && req.params.readerID)) {
		res.sendStatus(400);
	}

	const room = await Room.findByIdAndUpdate(req.params.roomID, { $pull: { accessReaders: req.params.readerID } });

	if (room) {
		res.status(200).end();
	} else {
		res.sendStatus(404);
	}

}