const mongoose = require('mongoose');
const Access = mongoose.model('Access');
const Room = mongoose.model('Room');
const Area = mongoose.model('Area');

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
		area.save()
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
		res.status(500);
		res.send("The area doesn't exist");
		return;
	}

	const room = new Room({
		name: req.body.name,
		area: area._id
	})

	try {
		room.save()
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

exports.getRoomsForArea = async (req, res) => {
	if (!req.params.id) {
		res.sendStatus(400);
	}

	const rooms = await Room.find({ area: req.params.id }).populate('area')

	const toReturn = rooms.map(r => r.toObject());

	res.json(toReturn)
}

exports.giveAccess = async (req, res, next) => {

}

exports.removeAccess = async (req, res, next) => {

}

exports.getAccessesForRoom = async (req, res) => {

}

exports.getMyAccesses = async (req, res) => {

}