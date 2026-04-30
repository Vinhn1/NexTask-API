import { Router } from 'express';
import { ProjectController } from './project.controller';
import { authMiddleware, protect } from '../../middlewares/authMiddleware';

const router = Router();
const projectController = new ProjectController();

// ROUTE: POST /
// bảo vệ route bằng authMiddleware.protect trước khi gọi projectController.create 
router.post('/', protect, projectController.create);

export default router;