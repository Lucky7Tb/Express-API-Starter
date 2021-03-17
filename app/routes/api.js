const express = require('express');
const router = express.Router();

const MyController = require('../controllers/MyController');
const AuthController = require('../controllers/AuthController');

router.get('/', MyController.index);
router.get("/auth", AuthController.index);

module.exports = router;