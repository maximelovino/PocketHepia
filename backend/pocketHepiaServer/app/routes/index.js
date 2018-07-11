const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const logsRouter = require('./logs');
const transactionsRouter = require('./transactions');
const accessRouter = require('./access');
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/logs', logsRouter);
router.use('/transactions', transactionsRouter);
router.use('/access', accessRouter);

const authController = require('../controllers/authController')

/**
 * 
 * @api {GET} /init Initializes the first user
 * @apiName Init
 * @apiGroup Other
 * @apiVersion  1.0.0
 * 
 
 * @apiSuccess (200) {String} email The email of the created user
 * @apiSuccess (200) {String} password The password of the created user
 * 
 * 
  * @apiSuccessExample {json} Success-Response:
 {
	"email": "hello@hello.com",
	"password": "risitas"
 }
 * 
 * 
 * @apiError (400) BadReques Error happens if the server is already initialized (contains at least one user)
 * 
 */
router.get("/init", authController.initFirstAdmin);

module.exports = router;