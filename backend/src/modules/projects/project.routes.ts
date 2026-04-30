import { Router } from 'express';
import { ProjectController } from './project.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();
const projectController = new ProjectController();

// ROUTE: POST /
// bảo vệ route bằng authMiddleware.protect trước khi gọi projectController.create 
router.post('/', protect, projectController.create);

// GET
// Lấy toàn bộ danh sách project của user 
router.get('/', protect, projectController.getAll);
export default router;