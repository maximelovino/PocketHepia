const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

const passport = require('passport');

router.get("/all", passport.authenticate('jwt'), logController.getAllLogs);

module.exports = router;