const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');
const accessController = require('../controllers/accessController');
const passport = require('passport');

/**
 * 
 * @api {POST} /access/createArea Create an area
 * @apiName AccessCreateArea
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} name The name of the area to create
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "name" : "El Risitas Area"
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * 
 */
router.post("/createArea", passport.authenticate('jwt'), authController.checkAdmin, accessController.createArea, logController.createArea)

/**
 * 
 * @api {POST} /access/createRoom Create a room
 * @apiName AccessCreateRoom
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} name The name of the room to create
 * @apiParam  {String} areaID The id of the area the room is in
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "name" : "El Risitas Room",
 *     "areaID" : "4346378dsfgd",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the area doesn't exist
 * 
 */
router.post("/createRoom", passport.authenticate('jwt'), authController.checkAdmin, accessController.createRoom, logController.createRoom)

/**
 * 
 * @api {POST} /access/giveAccess Give access to a room
 * @apiName AccessGiveAccess
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} roomID The id of the room to give access to
 * @apiParam  {String} userID The id of the user to give access to the room
 * @apiParam  {Int} [startDate] The start Date, as Unix milliseconds time
 * @apiParam  {Int} [endDate] The end Date, as Unix milliseconds time
 * @apiParam  {Int} [startTime] The start Time, as minutes past midnight
 * @apiParam  {Int} [endTime] The end Time, as minutes past midnight
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "roomID" : "537434hbbh",
 *     "userID" : "4e83e3fnwewefj",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room or user doesn't exist
 * 
 */
router.post("/giveAccess", passport.authenticate('jwt'), authController.checkAdmin, accessController.giveAccess, logController.giveAccess)

/**
 * 
 * @api {GET} /access/areas Retrieve all areas
 * @apiName AccessGetAreas
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - Areas array is the root document returned here
 * @apiSuccess (200) {String} -.name The area name
 * @apiSuccess (200) {User} -.id The area id
 * 
 * @apiSuccessExample {json} Success-Response:
[
	{
		"name": "ITI Floor",
		"id": "5b2f53450dde6c001bf242b4"
	},
	{
		"name": "AP Floor",
		"id": "5b2f53450ferfre6c001bf242b4"
	},
]
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * 
 */
router.get("/areas", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAreas)

/**
 * 
 * @api {POST} /access/area/:id Delete an area
 * @apiName AccessDeleteArea
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the area to delete
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "537434hr323bbh",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the area doesn't exist
 * 
 */
router.delete("/area/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteArea, logController.deleteArea)

/**
 * 
 * @api {GET} /access/rooms Retrieve all rooms
 * @apiName AccessGetRooms
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - Rooms array is the root document returned here
 * @apiSuccess (200) {String} -.name The room name
 * @apiSuccess (200) {User} -.id The room id
 * @apiSuccess (200) {String[]} -.accessReaders The list of readers
 * @apiSuccess (200) {Area} -.area The area containing the room
 * 
 * @apiSuccessExample {json} Success-Response:
[
	{
		"accessReaders": [
			"identifier1234"
		],
		"name": "A404",
		"area": {
			"name": "ITI Floor",
			"id": "5b2f53450dde6c001bf242b4"
		},
		"id": "5b2f534a0dde6c001bf242b6"
	},
	{
		"accessReaders": [
			"4324ident"
		],
		"name": "A406",
		"area": {
			"name": "ITI Floor",
			"id": "5b2f53450dde6c001bf242b4"
		},
		"id": "5b2f534a0dde6c34r3r001bf242b6"
	}
]
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * 
 */
router.get("/rooms", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRooms)

/**
 * 
 * @api {GET} /access/room/:id Retrieve a single room
 * @apiName AccessGetRoom
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiParam  {String} id The id of the room to delete
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "5374344234hr323bbh",
 * }
 * 
 * @apiSuccess (200) {Object} - Rooms array is the root document returned here
 * @apiSuccess (200) {String} -.name The room name
 * @apiSuccess (200) {User} -.id The room id
 * @apiSuccess (200) {String[]} -.accessReaders The list of readers
 * @apiSuccess (200) {Area} -.area The area containing the room
 * 
 * @apiSuccessExample {json} Success-Response:
	{
		"accessReaders": [
			"identifier1234"
		],
		"name": "A404",
		"area": {
			"name": "ITI Floor",
			"id": "5b2f53450dde6c001bf242b4"
		},
		"id": "5b2f534a0dde6c001bf242b6"
	}
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room doesn't exist
 * 
 */
router.get("/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoom)

/**
 * 
 * @api {POST} /access/room/:id Delete a room
 * @apiName AccessDeleteRoom
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the room to delete
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "5374344234hr323bbh",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room doesn't exist
 * 
 */
router.delete("/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteRoom, logController.deleteRoom)

/**
 * 
 * @api {GET} /access/accesses/room/:id Get acesses for a room
 * @apiName AccessGetAccessRoom
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - The list of accesses is the root of the document
 * @apiSuccess (200) {Room} -.room The room of the access
 * @apiSuccess (200) {User} -.user The user for the access
 * @apiSuccess (200) {Int} -.startDate The start Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.endDate The end Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.startTime The start Time, as minutes past midnight
 * @apiSuccess (200) {Int} -.endTime The end Time, as minutes past midnight
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
			"isAdmin": false,
			"isLibrarian": true,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "marco@lopes.com",
			"name": "Marco Lopes",
			"id": "5b2e149f0dde6c001bf242b2"
		},
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1530277560117,
		"endDate": 1530828000000,
		"id": "5b362ec30dde6c001bf242c3"
	},
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166290708,
		"endDate": 1532556000000,
		"id": "5b43be5b0dde6c001bf242d1"
	},
	{
		"startTime": 480,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166624790,
		"endDate": 1537394400000,
		"id": "5b43bfb40dde6c001bf242d3"
	}
]
 * 
 * @apiParam  {String} id The id of the room to get acceses for
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "5374344234hr323bbh",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room doesn't exist
 * 
 */
router.get("/accesses/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForRoom)

/**
 * 
 * @api {GET} /access/accesses/user/:id Get acesses for a user
 * @apiName AccessGetAccessUser
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - The list of accesses is the root of the document
 * @apiSuccess (200) {Room} -.room The room of the access
 * @apiSuccess (200) {User} -.user The user for the access
 * @apiSuccess (200) {Int} -.startDate The start Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.endDate The end Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.startTime The start Time, as minutes past midnight
 * @apiSuccess (200) {Int} -.endTime The end Time, as minutes past midnight
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
			"isAdmin": false,
			"isLibrarian": true,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "marco@lopes.com",
			"name": "Marco Lopes",
			"id": "5b2e149f0dde6c001bf242b2"
		},
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1530277560117,
		"endDate": 1530828000000,
		"id": "5b362ec30dde6c001bf242c3"
	},
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166290708,
		"endDate": 1532556000000,
		"id": "5b43be5b0dde6c001bf242d1"
	},
	{
		"startTime": 480,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166624790,
		"endDate": 1537394400000,
		"id": "5b43bfb40dde6c001bf242d3"
	}
]
 * @apiParam  {String} id The id of the user to get acceses for
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "5374344234hr323bbh",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the user doesn't exist
 * 
 */
router.get("/accesses/user/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForUser)

/**
 * 
 * @api {DELETE} /access/accesses/:id Delete acess
 * @apiName AccessDeleteAccess
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the access to delete
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "5374344234hr323bbh",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the access doesn't exist
 * 
 */
router.delete("/accesses/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteAccess, logController.deleteAccess)

/**
 * 
 * @api {POST} /access/accesses/room/reader Create room reader
 * @apiName AccessRoomReaderCreate
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} roomID The id of the room
 * @apiParam  {String} identifier The identifier of the access reader
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "roomID" : "5374344234hr323bbh",
 *     "identifier" : "248893rrfrhe",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room doesn't exist
 * 
 */
router.post("/accesses/room/reader", passport.authenticate('jwt'), authController.checkAdmin, accessController.createReaderForRoom)

/**
 * 
 * @api {GET} /access/accesses/room/:id/readers Get room readers
 * @apiName AccessRoomReaderGet
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {String[]} - Readers array is the root of the document
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	"identifier1234",
	"identifier1423235",
]
 * @apiParam  {String} id The id of the room
 * 
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "id" : "r3230424903",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room doesn't exist
 * 
 */
router.get("/accesses/room/:id/readers", passport.authenticate('jwt'), authController.checkAdmin, accessController.getReadersForRoom)

/**
 * 
 * @api {DELETE} /access/accesses/room/:roomID/reader/:readerID Delete room reader
 * @apiName AccessRoomReaderDelete
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty Response
 * 
 * @apiParam  {String} roomID The id of the room
 * @apiParam  {String} readerID The id of the reader
 * 
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     "roomID" : "r3230424903",
 *     "readerID" : "413984832048sfffe",
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you don't have admin permissions
 * @apiError (404) NotFound Error happens if the room or reader doesn't exist
 * 
 */
router.delete("/accesses/room/:roomID/reader/:readerID", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteReader)

/**
 * 
 * @api {GET} /access/accesses/my Get acesses for the connected user
 * @apiName AccessGetAccessMy
 * @apiGroup Access
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - The list of accesses is the root of the document
 * @apiSuccess (200) {Room} -.room The room of the access
 * @apiSuccess (200) {User} -.user The user for the access
 * @apiSuccess (200) {Int} -.startDate The start Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.endDate The end Date, as Unix milliseconds time
 * @apiSuccess (200) {Int} -.startTime The start Time, as minutes past midnight
 * @apiSuccess (200) {Int} -.endTime The end Time, as minutes past midnight
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 [
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
			"isAdmin": false,
			"isLibrarian": true,
			"acceptsPayments": false,
			"adminForAreas": [],
			"canInvite": false,
			"isAuditor": false,
			"email": "marco@lopes.com",
			"name": "Marco Lopes",
			"id": "5b2e149f0dde6c001bf242b2"
		},
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1530277560117,
		"endDate": 1530828000000,
		"id": "5b362ec30dde6c001bf242c3"
	},
	{
		"startTime": 0,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166290708,
		"endDate": 1532556000000,
		"id": "5b43be5b0dde6c001bf242d1"
	},
	{
		"startTime": 480,
		"endTime": 1439,
		"user": {
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
		"room": {
			"accessReaders": [
				"identifier1234"
			],
			"name": "A404",
			"area": {
				"name": "ITI Floor",
				"id": "5b2f53450dde6c001bf242b4"
			},
			"id": "5b2f534a0dde6c001bf242b6"
		},
		"startDate": 1531166624790,
		"endDate": 1537394400000,
		"id": "5b43bfb40dde6c001bf242d3"
	}
]
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * 
 */
router.get("/accesses/my", passport.authenticate('jwt'), accessController.getMyAccesses)

module.exports = router;