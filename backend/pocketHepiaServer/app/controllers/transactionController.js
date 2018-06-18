const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const User = mongoose.model('User');

exports.my = async (req, res) => {
	const transactions = await Transaction.find({
		$or: [
			{ from: req.user._id },
			{ to: req.user._id }
		]
	}).sort({ date: 'desc' }).populate('to').populate('from')

	const toSend = transactions.map(t => {
		if (t.from && t.from.id === req.user.id) {
			t.amount = t.amount * -1
		}
		return t.toObject()
	});
	res.json(toSend)
}

exports.getMyBalance = async (req, res) => {
	const balance = await req.user.getBalance();
	res.json(balance)
}

exports.pay = async (req, res) => {
	if (!(req.body.title && req.body.toID && req.body.amount)) {
		res.sendStatus(400)
		return
	}

	const destination = await User.findOne({ $or: [{ cardId: req.body.toID }, { virtualCard: req.body.toID }] })

	if (!destination) {
		res.status(500)
		res.send("The destination user doesn't exist")
		return
	}

	let floatAmount = 0
	try {
		floatAmount = parseFloat(req.body.amount)
	} catch (e) {
		res.status(500)
		res.send("Amount was not a number")
		return
	}

	if (floatAmount < 0) {
		res.status(400)
		res.send("Amount should be positive")
		return
	}

	const userBalance = await req.user.getBalance()
	if (userBalance < floatAmount) {
		res.status(500)
		res.send("Not enough money")
		return
	}

	const transaction = new Transaction({
		amount: floatAmount,
		from: req.user._id,
		to: destination._id,
		title: req.body.title
	})

	await transaction.save()
	res.sendStatus(200)
}

exports.getPaid = async (req, res) => {
	if (!(req.body.title && req.body.fromID && req.body.amount)) {
		res.sendStatus(400)
		return
	}

	const source = await User.findOne({ $or: [{ cardId: req.body.fromID }, { virtualCard: req.body.fromID }] })

	if (!source) {
		res.status(500)
		res.send("The source user doesn't exist")
		return
	}

	let floatAmount = 0
	try {
		floatAmount = parseFloat(req.body.amount)
	} catch (e) {
		res.status(500)
		res.send("Amount was not a number")
		return
	}

	if (floatAmount < 0) {
		res.status(400)
		res.send("Amount should be positive")
		return
	}


	const sourceBalance = await source.getBalance()

	if (sourceBalance < floatAmount) {
		res.status(500)
		res.send("Not enough money")
		return
	}

	const transaction = new Transaction({
		amount: floatAmount,
		to: req.user._id,
		from: source._id,
		title: req.body.title
	})

	await transaction.save()
	res.sendStatus(200)
}

exports.addToBalance = async (req, res, next) => {
	if (!(req.body.userID && req.body.amount)) {
		res.sendStatus(400)
		return
	}
	const user = await User.findById(req.body.userID)

	if (!user) {
		res.status(500)
		res.send("The user doesn't exist")
		return
	}

	let floatAmount = 0
	try {
		floatAmount = parseFloat(req.body.amount)
	} catch (e) {
		res.status(500)
		res.send("Amount was not a number")
		return
	}

	if (floatAmount < 0) {
		res.status(400)
		res.send("Amount should be positive")
		return
	}

	const transaction = new Transaction({
		amount: floatAmount,
		to: user._id,
		title: `Added by admin ${req.user.name}`,
		adminCharge: true
	})

	await transaction.save()

	req.transaction = transaction;

	req.affectedUser = user

	next()
}