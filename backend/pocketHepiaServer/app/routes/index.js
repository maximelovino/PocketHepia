const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const logsRouter = require('./logs');
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/logs', logsRouter);

const authController = require('../controllers/authController')

router.get("/init", authController.initFirstAdmin);

module.exports = router;