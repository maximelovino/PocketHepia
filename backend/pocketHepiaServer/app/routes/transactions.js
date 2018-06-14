const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')
const logsController = require('../controllers/logController')

const passport = require('passport');

router.get("/my", passport.authenticate('jwt'), transactionController.my)

router.post("/pay", passport.authenticate('jwt'), transactionController.pay)
router.post("/getPaid", passport.authenticate('jwt'), authController.checkAcceptPayment, transactionController.getPaid)

router.post("/setBalance", passport.authenticate('jwt'), authController.checkAdmin, transactionController.setBalance, logsController.setBalance)

module.exports = router;