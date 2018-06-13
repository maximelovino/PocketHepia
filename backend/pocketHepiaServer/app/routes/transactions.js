const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const transactionController = require('../controllers/transactionController')

const passport = require('passport');

router.get("/my", passport.authenticate('jwt'), transactionController.my)

router.post("/pay", passport.authenticate('jwt'), transactionController.pay)
router.post("/getPaid", passport.authenticate('jwt'), authController.checkAcceptPayment, transactionController.getPaid)

module.exports = router;