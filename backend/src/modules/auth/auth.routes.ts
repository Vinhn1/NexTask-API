import { Router } from 'express';
import { authController } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();

// Định nghĩa tuyến đường POST /register
router.post('/register', authController.register);

// Định nghĩa tuyến đường POST /login
router.post('/login', authController.login);

router.get('/me', protect, authController.getMe);

router.post('/logout', protect, authController.logout);

export default router;