const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')
const logsController = require('../controllers/logController')

const passport = require('passport');

/**
 * 
 * @api {GET} /transactions/my Retrieve the connected user's transactions
 * @apiName TransactionsMy
 * @apiGroup Transactions
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - Transactions array is the root document returned here
 * @apiSuccess (200) {Boolean} -.stripe Flag to specify if the transaction is a stripe charge
 * @apiSuccess (200) {Boolean} -.adminCharge Flag to specify if the transaction is a charge by an admin
 * @apiSuccess (200) {Int} -.amount The amount of the transactions, with the correct sign from the user's point of view
 * @apiSuccess (200) {Sting} -.title The transaction title
 * @apiSuccess (200) {User} -.id The transaction id
 * @apiSuccess (200) {User} -.data The transaction date, as Unix milliseconds time
 * @apiSuccess (200) {User} -.from The source user
 * @apiSuccess (200) {User} [-.to] The destination user
 * 
  * @apiSuccessExample {json} Success-Response:
[
	{
		"stripe": false,
		"adminCharge": true,
		"amount": 10,
		"to": {
			"isAdmin": true,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "maximelovino@gmail.com",
			"name": "Maxime Lovino",
			"importBatch": "038e9a70-7662-11e8-ab85-f986a9facd10",
			"id": "5b2d67fd9073cd001b2cbcb7"
		},
		"title": "Added by admin Maxime Lovino",
		"date": 1531036757189,
		"id": "5b41c4550dde6c001bf242cf"
	},
	{
		"stripe": false,
		"adminCharge": false,
		"amount": -15,
		"from": {
			"isAdmin": true,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "maximelovino@gmail.com",
			"name": "Maxime Lovino",
			"importBatch": "038e9a70-7662-11e8-ab85-f986a9facd10",
			"id": "5b2d67fd9073cd001b2cbcb7"
		},
		"to": {
			"isAdmin": false,
			"isLibrarian": false,
			"acceptsPayments": true,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "cafet@hepia.ch",
			"name": "Cafet Novae",
			"importBatch": "038e9a70-7662-11e8-ab85-f986a9facd10",
			"cardId": "0444ae929e3380",
			"id": "5b2d67fd9073cd001b2cbcba"
		},
		"title": "Burger",
		"date": 1531036728170,
		"id": "5b41c4380dde6c001bf242ce"
	}
]
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * 
 */
router.get("/my", passport.authenticate('jwt'), transactionController.my)

/**
 * 
 * @api {GET} /transactions/balance Retrieve the balance of the connected user
 * @apiName TransactionsBalance
 * @apiGroup Transactions
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Double} - The balance value is the whole content
 * 
 * @apiSuccessExample {json} Success-Response:
42.50
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * 
 */
router.get("/balance", passport.authenticate('jwt'), transactionController.getMyBalance)

/**
 * 
 * @api {POST} /transactions/pay Make a payment to a user
 * @apiName TransactionsPay
 * @apiGroup Transactions
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} title The payment title description
 * @apiParam  {String} toID The card ID scanned for the user
 * @apiParam  {Double} amount The payment amount
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "title" : "El Risitas Payment",
 *     "toID" : "423432080f",
 *     "amount" : 42
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (500) InternalServerError Error happens if the transaction can not be made, for example not enough money
 * 
 */
router.post("/pay", passport.authenticate('jwt'), transactionController.pay)

/**
 * 
 * @api {POST} /transactions/getPaid Receive a payment from a user
 * @apiName TransactionsGetPaid
 * @apiGroup Transactions
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} title The payment title description
 * @apiParam  {String} fromID The card ID scanned for the user
 * @apiParam  {Double} amount The payment amount
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "title" : "El Risitas Payment",
 *     "fromID" : "423432080f",
 *     "amount" : 42
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have permission to accept payments
 * @apiError (500) InternalServerError Error happens if the transaction can not be made, for example not enough money
 * 
 */
router.post("/getPaid", passport.authenticate('jwt'), authController.checkAcceptPayment, transactionController.getPaid)

/**
 * 
 * @api {POST} /transactions/addBalance Add money to a user balance
 * @apiName TransactionsAddBalance
 * @apiGroup Transactions
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} userID The ID of the user to recharge
 * @apiParam  {Double} amount The payment amount
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "userID" : "2438237fdsf",
 *     "amount" : 42
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin rights
 * 
 */
router.post("/addBalance", passport.authenticate('jwt'), authController.checkAdmin, transactionController.addToBalance, logsController.addToBalance)

module.exports = router;