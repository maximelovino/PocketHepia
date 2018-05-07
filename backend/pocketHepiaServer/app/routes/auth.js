const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');
const passport = require('passport');


router.post("/register", authController.register);

router.post("/login", passport.authenticate('local'), authController.login);

router.post("/changePassword", passport.authenticate('jwt'), authController.changePassword, logController.passwordChange);

module.exports = router;