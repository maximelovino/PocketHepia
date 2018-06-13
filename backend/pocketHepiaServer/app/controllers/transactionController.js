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
	if (!(req.body.title & req.body.toID & req.body.amount)) {
		res.sendStatus(400)
		return
	}

	//TODO find the TO user => if it doesn't exist => return 500
	//TODO check my balance => if not enough => return 500 with message
	//TODO (in transaction) => create transaction => save it => update balance of FROM => return 200 if all good
}

exports.getPaid = async (req, res) => {

}