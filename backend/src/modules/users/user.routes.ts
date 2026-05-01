import { Router } from 'express';
import { userController } from './user.controller';
import { protect } from '../../middlewares/authMiddleware';
import { upload } from '../../middlewares/upload.middleware';

const router = Router();

// PATCH
router.patch('/update-avatar', protect, upload.single('avatar'), userController.updateAvatar);

export default router;