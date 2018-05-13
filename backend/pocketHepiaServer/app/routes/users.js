const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const logController = require('../controllers/logController')

const passport = require('passport');

router.get("/current", passport.authenticate('jwt'), userController.current);
router.get("/all", passport.authenticate('jwt'), authController.checkAdmin, userController.all)
router.post("/create", passport.authenticate('jwt'), authController.checkAdmin, userController.create, logController.userCreation);

module.exports = router;