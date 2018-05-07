const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const logsRouter = require('./logs');
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/logs', logsRouter);

router.get("/", (req, res) => {
	res.send("Hello world");
});

module.exports = router;