const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const logController = require('../controllers/logController')
const csv = require('../handlers/csv')

let multer = require('multer')
let upload = multer({ dest: 'uploads/' })

const passport = require('passport');

router.get("/current", passport.authenticate('jwt'), userController.current);
router.get("/all", passport.authenticate('jwt'), authController.checkAdmin, userController.all)
router.post("/create", passport.authenticate('jwt'), authController.checkAdmin, userController.create, logController.userCreation);
router.delete("/delete/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.delete, logController.userDeletion)
router.put("/resetPassword/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.resetPassword, logController.resetPassword)
router.put("/changePermissions/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.changePermissions, logController.changePermissions)
router.post("/import", passport.authenticate('jwt'), authController.checkAdmin, upload.single('csvFile'), csv.parseUsers, userController.import, logController.importUsers)
router.delete("/undo/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.undoImport, logController.undoImport)

router.put("/assign", passport.authenticate('jwt'), authController.checkAdmin, userController.assignTag, logController.assignTag)

router.delete("/removeTag/:id", passport.authenticate('jwt'), authController.checkAdmin, userController.removeTag, logController.removeTag)

module.exports = router;