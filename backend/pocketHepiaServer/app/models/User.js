const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose')
const validator = require('validator');
const Schema = mongoose.Schema;

const Transaction = mongoose.model('Transaction');

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please supply a name'
	},
	email: {
		type: String,
		lowercase: true,
		required: 'Please Supply an email address',
		unique: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid email address']
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	cardId: {
		type: String,
		required: false
	},
	virtualCard: {
		type: String,
		required: false
	},
	balance: {
		type: Number,
		required: true,
		min: [0, 'No negative balance'],
		default: 0
	},
	isLibrarian: {
		type: Boolean,
		required: true,
		default: false
	},
	acceptsPayments: {
		type: Boolean,
		required: true,
		default: false
	},
	//TODO add ref
	adminForAreas: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: []
	},
	expiration: {
		type: Date,
		required: false
	},
	canInvite: {
		type: Boolean,
		required: true,
		default: false
	},
	isAuditor: {
		type: Boolean,
		required: true,
		default: false
	},
	importBatch: {
		type: String
	}
});


UserSchema.method('getBalance', async function () {
	const balanceIn = await Transaction.aggregate([{
		$match: {
			to: this._id
		}
	}, {
		$group: {
			_id: null,
			totalAmount: { $sum: "$amount" }
		}
	}]);

	const balanceOut = await Transaction.aggregate([{
		$match: {
			from: this._id
		}
	}, {
		$group: {
			_id: null,
			totalAmount: { $sum: "$amount" }
		}
	}]);
	const inMoney = balanceIn[0] ? balanceIn[0].totalAmount : 0.0;
	const outMoney = balanceOut[0] ? balanceOut[0].totalAmount : 0.0;
	const totalBalance = inMoney - outMoney
	return totalBalance
})

if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret) {
	// Sets the _id to id and remove the version tag, not useful
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

UserSchema.plugin(passportMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);