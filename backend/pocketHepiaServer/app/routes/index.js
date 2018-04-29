const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
router.use('/auth', authRouter);

router.get("/", (req, res) => {
	res.send("Hello world");
})

module.exports = router;