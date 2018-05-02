const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get("/", (req, res) => {
	res.send("Hello world");
});

module.exports = router;