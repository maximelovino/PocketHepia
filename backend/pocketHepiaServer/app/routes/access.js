const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');
const accessController = require('../controllers/accessController');
const passport = require('passport');

router.post("/createArea", passport.authenticate('jwt'), authController.checkAdmin, accessController.createArea, logController.createArea)

router.post("/createRoom", passport.authenticate('jwt'), authController.checkAdmin, accessController.createRoom, logController.createRoom)

router.post("/giveAccess", passport.authenticate('jwt'), authController.checkAdmin, accessController.giveAccess, logController.giveAccess)

router.get("/areas", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAreas)

//TODO is this admin only or for everybody for completion?
router.get("/rooms", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRooms)

router.get("/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoom)

//TODO this should be /rooms/area/:id or area/:id/rooms
router.get("/rooms/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoomsForArea)

router.get("/accesses/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForRoom)
router.get("/accesses/user/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForUser)

router.get("/accesses/my", passport.authenticate('jwt'), accessController.getMyAccesses)

module.exports = router;