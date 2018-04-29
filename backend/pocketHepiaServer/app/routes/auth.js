const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post("/register", authController.register, (req, res) => {
	res.send("It worked");
});

router.post("/login", authController.login, (req, res) => {
	console.log(req.user);
	res.contentType('json');
	res.send(JSON.stringify(req.user));
})

module.exports = router;