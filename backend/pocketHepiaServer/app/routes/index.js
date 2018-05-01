const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const passport = require('passport');
router.use('/auth', authRouter);

router.get("/", (req, res) => {
	res.send("Hello world");
})

router.get("/secret", passport.authenticate('jwt'), (req, res) => {
	res.json(req.user);
});

module.exports = router;