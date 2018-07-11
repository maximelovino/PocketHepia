const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');
const passport = require('passport');

//TODO remove this?
router.post("/register", authController.register);

/**
 * 
 * @api {POST} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * 
 * @apiParam  {String} email The email to login with
 * @apiParam  {String} password The password to login with
 * 
 * @apiSuccess (200) {String} token The JWT Token to use to access the rest of the API
 * @apiSuccess (200) {String} id The ID of the user who logged in
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     email : smartguy@hepia.ch,
 *     password : Pa$$w0rd
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJiYWxhbmNlIjowLCJpc0xpYnJhcmlhbiI6ZmFsc2UsImFjY2VwdHNQYXltZW50cyI6ZmFsc2UsImFkbWluRm9yQXJlYXMiOltdLCJjYW5JbnZpdGUiOmZhbHNlLCJpc0F1ZGl0b3IiOmZhbHNlLCJlbWFpbCI6Im1heGltZWxvdmlub0BnbWFpbC5jb20iLCJuYW[...]",
 *     "id" : "8008CAFE"
 * }
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly
 * @apiError (401) Unauthorized Error happens if email or password are wrong
 * 
 */
router.post("/login", passport.authenticate('local'), authController.login);


/**
 * 
 * @api {POST} /auth/changePassword Change Password
 * @apiName ChangePassword
 * @apiGroup Auth
 * @apiVersion  1.0.0
 * 
 * @apiHeader {String} Authorization The content of the authorization header must be of the form "Bearer $token" where $token is the JWT Token received at login
 * 
 * @apiParam  {String} oldPassword The current password
 * @apiParam  {String} password The new password
 * @apiParam  {String} password2 The new password confirmation
 * 
 * 
 * @apiParamExample  {x-www-form-urlencoded} Request-Example:
 * {
 *     oldPassword : 12345,
 *     password : Pa$$w0rd,
 *     password2 : Pa$$w0rd
 * }
 * 
 * @apiSuccess (200) {Void} OK Empty response
 * 
 * @apiError (400) BadRequest Error happens if the params are not set correctly or passwords don't match
 * @apiError (401) Unauthorized Error happens if JWT Token is wrong or authorization was not correctly provided
 * 
 */

router.post("/changePassword", passport.authenticate('jwt'), authController.changePassword, logController.passwordChange);

module.exports = router;