import { Router } from 'express';
import { ProjectController } from './project.controller';
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import { createProjectSchema, updateProjectSchema } from './project.dto';

const router = Router();
const projectController = new ProjectController();

// ROUTE: POST /
// bảo vệ route bằng authMiddleware.protect trước khi gọi projectController.create 
router.post('/', protect, validate(createProjectSchema) ,projectController.create);

// GET
// Lấy toàn bộ danh sách project của user 
router.get('/', protect, projectController.getAll);

// PATCH (Sửa 1 phần)
router.patch('/:id', protect, validate(updateProjectSchema) ,projectController.update);

// DELETE 
router.delete('/:id', protect, projectController.delete);

export default router;
