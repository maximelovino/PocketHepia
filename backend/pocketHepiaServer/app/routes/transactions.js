const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')
const logsController = require('../controllers/logController')

const passport = require('passport');

router.get("/my", passport.authenticate('jwt'), transactionController.my)
router.get("/balance", passport.authenticate('jwt'), transactionController.getMyBalance)

router.post("/pay", passport.authenticate('jwt'), transactionController.pay)
router.post("/getPaid", passport.authenticate('jwt'), authController.checkAcceptPayment, transactionController.getPaid)

router.post("/addBalance", passport.authenticate('jwt'), authController.checkAdmin, transactionController.addToBalance, logsController.addToBalance)

module.exports = router;