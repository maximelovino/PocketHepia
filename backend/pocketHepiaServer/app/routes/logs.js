const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authController = require('../controllers/authController');

const passport = require('passport');

/**
 * 
 * @api {GET} /logs/all Retrieve all logs
 * @apiName AllLogs
 * @apiGroup Logs
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - Logs array is the root document returned here
 * @apiSuccess (200) {String} -.id The log id
 * @apiSuccess (200) {String} -.category The log category
 * @apiSuccess (200) {User} -.triggeringUser The User object for the user that triggered the log
 * @apiSuccess (200) {String} -.description The description of the log
 * @apiSuccess (200) {Int} -.date The date of the log, as Unix milliseconds time
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	{
		"date": 1525784715359,
		"category": "User Password Change",
		"triggeringUser": {
			"isAdmin": true,
			"balance": 0,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"email": "vincent.tournier@balelec.ch",
			"name": "Vincent Tournier",
			"id": "5ae99baf51cba71d9d11c63c"
		},
		"description": "Vincent Tournier changed its password",
		"id": "5af1a1733e56ff9fb9975720"
	},
	{
		"date": 1525769974847,
		"category": "User Password Change",
		"triggeringUser": {
			"isAdmin": false,
			"balance": 0,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"email": "maja.stajic@etu.hesge.ch",
			"name": "Maja Stajic",
			"id": "5aef08eed1d64f67166dd833"
		},
		"description": "Maja Stajic changed its password",
		"id": "5af16bdd7464de6173733a26"
	}
]
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.get("/all", passport.authenticate('jwt'), authController.checkAdmin, logController.getAllLogs);

/**
 * 
 * @api {GET} /logs/range/:startDate/:endDate Retrieve all logs in a given date Range
 * @apiName RangeLogs
 * @apiGroup Logs
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * 
 * @apiParam  {Int} startDate The startDate as Unix milliseconds time
 * @apiParam  {Int} endDate The endDate as Unix milliseconds time
 * 
 * @apiParamExample {} Request-Example:
 * {
 *     "startDate" : 1525752000,
 *     "endDate" : 1525784716
 * }
 * 
 * @apiSuccess (200) {Object[]} - Logs array is the root document returned here
 * @apiSuccess (200) {String} -.id The log id
 * @apiSuccess (200) {String} -.category The log category
 * @apiSuccess (200) {User} -.triggeringUser The User object for the user that triggered the log
 * @apiSuccess (200) {String} -.description The description of the log
 * @apiSuccess (200) {Int} -.date The date of the log, as Unix milliseconds time
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	{
		"date": 1525784715359,
		"category": "User Password Change",
		"triggeringUser": {
			"isAdmin": true,
			"balance": 0,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"email": "vincent.tournier@balelec.ch",
			"name": "Vincent Tournier",
			"id": "5ae99baf51cba71d9d11c63c"
		},
		"description": "Vincent Tournier changed its password",
		"id": "5af1a1733e56ff9fb9975720"
	},
	{
		"date": 1525769974847,
		"category": "User Password Change",
		"triggeringUser": {
			"isAdmin": false,
			"balance": 0,
			"isLibrarian": false,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"email": "maja.stajic@etu.hesge.ch",
			"name": "Maja Stajic",
			"id": "5aef08eed1d64f67166dd833"
		},
		"description": "Maja Stajic changed its password",
		"id": "5af16bdd7464de6173733a26"
	}
]
 * 
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.get("/range/:startDate/:endDate", passport.authenticate('jwt'), authController.checkAdmin, logController.getLogs);

/**
 * 
 * @api {GET} /logs/categories Retrieve all log categories
 * @apiName CategoriesLogs
 * @apiGroup Logs
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {String[]} - Categories array
 * 
 * @apiSuccessExample {json} Success-Response:
 * [
	"User Creation",
	"User Password Change",
	"User Deleted",
	"Admin Imports Users",
	"Admin Cancels Import",
	"Admin Assigned NFC Tag",
	"Admin Removed NFC Tag",
	"Admin Add To Balance",
	"Admin Password Change",
	"Admin Permissions Change",
	"Admin Creates Area",
	"Admin Removes Area",
	"Admin Area Delegation",
	"Admin Removes Delegation",
	"Admin Creates Room",
	"Admin Deletes Room",
	"Admin Gives Access",
	"Admin Removes Access",
	"Admin Does Request",
	"Admin Deletes Request"
]
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.get("/categories", passport.authenticate('jwt'), authController.checkAdmin, logController.getCategories);

module.exports = router;