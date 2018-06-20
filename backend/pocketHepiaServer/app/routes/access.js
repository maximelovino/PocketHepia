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

router.delete("/area/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteArea, logController.deleteArea)

//TODO is this admin only or for everybody for completion?
router.get("/rooms", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRooms)

router.get("/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoom)

router.delete("/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteRoom, logController.deleteRoom)

//TODO this should be /rooms/area/:id or area/:id/rooms
router.get("/rooms/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getRoomsForArea)

router.get("/accesses/room/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForRoom)
router.get("/accesses/user/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.getAccessesForUser)

router.delete("/accesses/:id", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteAccess, logController.deleteAccess)

router.post("/accesses/room/reader", passport.authenticate('jwt'), authController.checkAdmin, accessController.createReaderForRoom)

router.get("/accesses/room/:id/readers", passport.authenticate('jwt'), authController.checkAdmin, accessController.getReadersForRoom)

router.delete("/accesses/room/:roomID/reader/:readerID", passport.authenticate('jwt'), authController.checkAdmin, accessController.deleteReader)




router.get("/accesses/my", passport.authenticate('jwt'), accessController.getMyAccesses)

module.exports = router;