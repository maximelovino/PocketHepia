const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const passport = require('passport');

router.get("/current", passport.authenticate('jwt'), userController.current);

module.exports = router;