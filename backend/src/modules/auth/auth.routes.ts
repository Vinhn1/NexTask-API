import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

// Định nghĩa tuyến đường POST /register
router.post('/register', authController.register);

export default router;