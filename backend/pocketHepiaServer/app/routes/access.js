const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');
const accessController = require('../controllers/accessController');
const passport = require('passport');

router.post("/createArea", passport.authenticate('jwt'), authController.checkAdmin, accessController.createArea, logController.createArea)

router.post("/createRoom", passport.authenticate('jwt'), authController.checkAdmin, accessController.createRoom, logController.createRoom)

router.get("/areas", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAreas)

router.get("/rooms/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoomsForArea)

module.exports = router;