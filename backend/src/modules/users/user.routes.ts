import { Router } from 'express';
import { userController } from './user.controller';
import { protect } from '../../middlewares/authMiddleware';
import { uploadCloud } from '../../middlewares/upload.cloudinary.middleware';
import { validate } from '../../middlewares/validate';
import { updateProfileSchema } from './user.dto';

const router = Router();

// PATCH profile info
router.patch('/me', protect, validate(updateProfileSchema), userController.updateProfile);

// PATCH avatar — dùng Cloudinary thay vì local disk
router.patch('/update-avatar', protect, uploadCloud.single('avatar'), userController.updateAvatar);

export default router;
