import { Router } from 'express';
import { userController } from './user.controller';
import { protect } from '../../middlewares/authMiddleware';
import { upload } from '../../middlewares/upload.middleware';
import { validate } from '../../middlewares/validate';
import { updateProfileSchema } from './user.dto';

const router = Router();

// PATCH
router.patch('/me', protect, validate(updateProfileSchema), userController.updateProfile);
router.patch('/update-avatar', protect, upload.single('avatar'), userController.updateAvatar);

export default router;
