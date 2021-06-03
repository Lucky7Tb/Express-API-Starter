import express from 'express';
const router = express.Router();

import { MyController, AuthController } from '../controllers';

router.get('/', MyController.index);

// Auth route
router.post("/auth/login", AuthController.login);

module.exports = router;
