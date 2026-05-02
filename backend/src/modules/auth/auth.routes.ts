import { Router } from 'express';
import { authController } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from './auth.dto';
import { restrictTo } from '../../middlewares/restrictTo';
import { authLimiter } from '../../middlewares/rateLimiter';

const router = Router();

// Định nghĩa tuyến đường POST /register
router.post('/register', authLimiter, validate(registerSchema), authController.register);

// Định nghĩa tuyến đường POST /login
router.post('/login', authLimiter, validate(loginSchema), authController.login);

router.get('/me', protect, authController.getMe);

router.post('/logout', protect, authController.logout);

router.get('/all-users', protect, restrictTo('ADMIN'), (req, res) => res.json({
    message: 'Chào Sếp!'
}));

export default router;