const express = require('express');
const router = express.Router();

const {
	AuthController
} = require('../controllers');

router.get('/', (_, res) => {
	res.json({
		'message': 'Hai ❤',
	});
});

// Auth route
router
	.post("/auth/login", AuthController.login);

module.exports = router;
