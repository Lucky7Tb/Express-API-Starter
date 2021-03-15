const express = require('express');
const router = express.Router();

const MyController = require('../controllers/MyController');

router.get('/api', MyController.index);

module.exports = router;