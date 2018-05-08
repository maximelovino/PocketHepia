const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const authController = require('../controllers/authController');

const passport = require('passport');

router.get("/all", passport.authenticate('jwt'), authController.checkAdmin, logController.getAllLogs);

router.get("/categories", passport.authenticate('jwt'), authController.checkAdmin, logController.getCategories);

module.exports = router;