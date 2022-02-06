const express = require('express');
const authMiddleware = require('../middlewares/Authenticated');

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
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

// Tes route
router.get("/test", authMiddleware, (_, res) => {
	res.json({ message: "hello" });
});

module.exports = router;
