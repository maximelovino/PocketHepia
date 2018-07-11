const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const logController = require('../controllers/logController')
const csv = require('../handlers/csv')

let multer = require('multer')
let upload = multer({ dest: 'uploads/' })

const passport = require('passport');

/**
 * 
 * @api {GET} /users/current Get connected user
 * @apiName CurrentUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object} - User object is the root document returned here
 * @apiSuccess (200) {String} -.id The id of the user
 * @apiSuccess (200) {String} -.name The name of the user
 * @apiSuccess (200) {String} -.email The email of the user
 * @apiSuccess (200) {Boolean} -.isAdmin A boolean to specify if the user has admin role
 * @apiSuccess (200) {Boolean} -.canInvite A boolean to specify if the user has invite role
 * @apiSuccess (200) {Boolean} -.acceptsPayments A boolean to specify if the user has acceptsPayment role
 * @apiSuccess (200) {Boolean} -.isAuditor A boolean to specify if the user has auditor role
 * @apiSuccess (200) {Boolean} -.isLibrarian A boolean to specify if the user has librarian role
 * @apiSuccess (200) {Object[]} -.adminForAreas An array of areas the user is admin for
 * @apiSuccess (200) {String} -.adminForAreas.id The id of the area
 * @apiSuccess (200) {String} -.adminForAreas.name The name of the area
 * @apiSuccess (200) {String} [-.importBatch] The import batch id of the user
 * @apiSuccess (200) {String} [-.cardID] The id of the user card
 * @apiSuccess (200) {String} [-.virtualCard] The id of the user virtualCard
 * @apiSuccess (200) {String} [-.expiration] The expiration date of this user
 * 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
{
	"isAdmin": true,
	"isLibrarian": false,
	"acceptsPayments": false,
	"adminForAreas": [],
	"canInvite": false,
	"isAuditor": false,
	"email": "maximelovino@gmail.com",
	"name": "Maxime Lovino",
	"importBatch": "f5b43380-74cf-11e8-8fd2-514acc764100",
	"id": "5b2ac574cb90fa001b99e843"
}
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * 
 */
router.get("/current", passport.authenticate('jwt'), userController.current);

/**
 * 
 * @api {GET} /users/all Get all users
 * @apiName AllUsers
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Object[]} - User array is the root document returned here
 * @apiSuccess (200) {String} -.id The id of the user
 * @apiSuccess (200) {String} -.name The name of the user
 * @apiSuccess (200) {String} -.email The email of the user
 * @apiSuccess (200) {Boolean} -.isAdmin A boolean to specify if the user has admin role
 * @apiSuccess (200) {Boolean} -.canInvite A boolean to specify if the user has invite role
 * @apiSuccess (200) {Boolean} -.acceptsPayments A boolean to specify if the user has acceptsPayment role
 * @apiSuccess (200) {Boolean} -.isAuditor A boolean to specify if the user has auditor role
 * @apiSuccess (200) {Boolean} -.isLibrarian A boolean to specify if the user has librarian role
 * @apiSuccess (200) {Object[]} -.adminForAreas An array of areas the user is admin for
 * @apiSuccess (200) {String} -.adminForAreas.id The id of the area
 * @apiSuccess (200) {String} -.adminForAreas.name The name of the area
 * @apiSuccess (200) {String} [-.importBatch] The import batch id of the user
 * @apiSuccess (200) {String} [-.cardID] The id of the user card
 * @apiSuccess (200) {String} [-.virtualCard] The id of the user virtualCard
 * @apiSuccess (200) {String} [-.expiration] The expiration date of this user
 * 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
[
	{
		"isAdmin": false,
		"isLibrarian": false,
		"acceptsPayments": true,
		"adminForAreas": [],
		"canInvite": false,
		"isAuditor": false,
		"email": "cafet@hepia.ch",
		"name": "Cafet Novae",
		"importBatch": "4526f000-7314-11e8-8f2b-9318a3e8a3ea",
		"id": "5b27dd110abf2c001c15f4b5"
	},
	{
		"isAdmin": true,
		"isLibrarian": false,
		"acceptsPayments": false,
		"adminForAreas": [],
		"canInvite": false,
		"isAuditor": false,
		"email": "root@pockethepia.maximelovino.ch",
		"name": "Default Root Account",
		"id": "5b1fd5bb44ab8b001de7de16"
	}
]
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.get("/all", passport.authenticate('jwt'), authController.checkAdmin, userController.all)


/**
 * 
 * @api {POST} /users/create Create user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} name The name of the user
 * @apiParam  {String} email The email of the user
 * @apiParam  {String} password The password for the user
 * @apiParam  {Boolean} [isAdmin] A boolean to specify if the user has admin role
 * @apiParam  {Boolean} [canInvite] A boolean to specify if the user has invite role
 * @apiParam  {Boolean} [acceptsPayments] A boolean to specify if the user has acceptsPayment role
 * @apiParam  {Boolean} [isAuditor] A boolean to specify if the user has auditor role
 * @apiParam  {Boolean} [isLibrarian] A boolean to specify if the user has librarian role
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     name : El Risitas,
 *     email : risitas@jvc.com,
 *     password : Pa$$w0rd
 * }
 * 
 * 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.post("/create", passport.authenticate('jwt'), authController.checkAdmin, userController.create, logController.userCreation);

/**
 * 
 * @api {DELETE} /users/delete/:id Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the user to delete
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     id : 5b1fd5bb44ab8b001de7de16
 * }
 * 
 * 
 * @apiError (400) BadRequest Error happens if you try to delete yourself
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.delete("/delete/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.delete, logController.userDeletion)


/**
 * 
 * @api {PUT} /users/resetPassword/:id Reset user password
 * @apiName ResetPassword
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the user for which to reset the password
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     id : 5b1fd5bb44ab8b001de7de16
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly or passwords don't match
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.put("/resetPassword/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.resetPassword, logController.resetPassword)

/**
 * 
 * @api {PUT} /users/changePermissions/:id Change user permissions
 * @apiName ChangePermissions
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the user for which to change permissions
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     id : 5b1fd5bb44ab8b001de7de16
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * @apiError [404] NotFound Error happens if the user doesn't exist
 * 
 */
router.put("/changePermissions/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.changePermissions, logController.changePermissions)

/**
 * 
 * @api {POST} /users/import Import a batch of users
 * @apiName ImportUsers
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {File} csvFile A CSV file containing the users
 * 
 * 
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.post("/import", passport.authenticate('jwt'), authController.checkAdmin, upload.single('csvFile'), csv.parseUsers, userController.import, logController.importUsers)

/**
 * 
 * @api {DELETE} /users/undo/:id Undoes a batch import of users
 * @apiName UndoImportUsers
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the import we want to undo
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     id : 42352545207097153
 * }
 * 
 * 
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * 
 */
router.delete("/undo/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.undoImport, logController.undoImport)

/**
 * 
 * @api {PUT} /users/assign Assign a tag to a user
 * @apiName AssignTagUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} userID The id of the user
 * @apiParam  {String} tagID The id of the tag to assign
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     userID : 42352545207097153,
 *     tagID : CAFE8008
 * }
 * 
 * 
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * @apiError [404] NotFound Error happens if the user doesn't exist
 * @apiError [500] InternalServerError Error happens if the tag is already assigned
 * 
 */
router.put("/assign", passport.authenticate('jwt'), authController.checkAdmin, userController.assignTag, logController.assignTag)

//This :id is the user id actually
/**
 * 
 * @api {DELETE} /users/removeTag/:id Removes a tag for a user
 * @apiName RemoveTagUser
 * @apiGroup Users
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiParam  {String} id The id of the user
 * 
 * 
 * @apiParamExample  {} Request-Example:
 * {
 *     userID : 42352545207097153
 * }
 * 
 * 
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly 
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * @apiError (403) Forbidden Error happens if you try to access this without having the admin role
 * @apiError [404] NotFound Error happens if the user doesn't exist
 * 
 */
router.delete("/removeTag/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.removeTag, logController.removeTag)

module.exports = router;