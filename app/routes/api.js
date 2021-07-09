const express = require('express');
const router = express.Router();

const { MyController, AuthController } = require('../controllers');

router.get('/', MyController.index);

// Auth route
router.post("/auth/login", AuthController.login);

module.exports = router;
