import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// Định nghĩa tuyến đường POST /register
router.post('/register', authController.register);

// Định nghĩa tuyến đường POST /login
router.post('/login', authController.login);

export default router;