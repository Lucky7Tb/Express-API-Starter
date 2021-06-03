const express = require('express');
const router = express.Router();

const MyController = require('@controllers/MyController');
const AuthController = require("@controllers/AuthController");

router.get('/', MyController.index);

// Auth route
router.post("/auth/login", AuthController.login);

module.exports = router;
