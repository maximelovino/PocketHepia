const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const User = mongoose.model('User');

exports.my = async (req, res) => {
	// TODO should we directly here change the sign of the transactions "from"? It's not much work
	const transactions = await Transaction.find({
		$or: [
			{ from: req.user._id },
			{ to: req.user._id }
		]
	}).sort({ date: 'desc' }).populate('to').populate('from')
	const toSend = transactions.map(t => t.toObject())
	res.json(toSend)
}

exports.pay = async (req, res) => {
	if (!(req.body.title && req.body.toID && req.body.amount)) {
		res.sendStatus(400)
		return
	}

	const destination = await User.findById(req.body.toID)

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



	const balanceChangeForMe = floatAmount


	//TODO The problem here is the validator doesn't run on update with $inc

	try {
		const current = await User.findById(req.user._id)
		if (current.balance < floatAmount) {
			res.status(500)
			res.send("Not enough money")
			return
		}
		current.balance = current.balance - floatAmount;
		await current.save()
	} catch (e) {
		console.error(e)
		res.status(500)
		res.send("Not enough money")
		return
	}


	try {
		await User.findByIdAndUpdate(destination._id, { $inc: { balance: floatAmount } })
	} catch (e) {
		console.error(e)
		res.status(500)
		res.send("Problem increasing other balance")
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

	//TODO find the TO user => if it doesn't exist => return 500
	//TODO check my balance => if not enough => return 500 with message
	//TODO (in transaction) => update balance of FROM (add limit in model so it can be <0) => create transaction => save it => return 200 if all good
}

exports.getPaid = async (req, res) => {
	res.sendStatus(200)
}