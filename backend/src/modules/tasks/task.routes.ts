import { Router } from 'express';
import { TaskController } from './task.controller';
import { protect } from '../../middlewares/authMiddleware';
import router from '../auth/auth.routes';

const router = Router();
const taskController = new TaskController();

// POST / (create)
router.post('/', protect, taskController.createTask);

// GET 
router.get('/:projectId', protect, taskController.getTasks);


export default router;