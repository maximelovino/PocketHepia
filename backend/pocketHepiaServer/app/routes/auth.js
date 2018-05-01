const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');


router.post("/register", authController.register, (req, res) => {
	res.sendStatus(200);
});

router.post("/login", authController.login, (req, res) => {
	console.log("New login:")
	console.log(req.user.toObject());
	const token = jwt.sign(req.user.toObject(), process.env.JWT_SECRET);
	res.json({ token });
});

module.exports = router;