const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');


router.post("/register", authController.register);

router.post("/login", passport.authenticate('local'), authController.login);

module.exports = router;