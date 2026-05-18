import { Router } from 'express';
import { authController } from './auth.controller';
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from './auth.dto';
import { restrictTo } from '../../middlewares/restrictTo';
import { authLimiter } from '../../middlewares/rateLimiter';
import passport from 'passport';

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

// Social Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.socialLoginSuccess);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), authController.socialLoginSuccess);

// Password Recovery
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password/:token', authLimiter, authController.resetPassword);

export default router;