import { Router } from 'express';
import { TaskController } from './task.controller';
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import { createTaskSchema, updateTaskSchema } from './task.dto';

const router = Router();
const taskController = new TaskController();

// POST / (create)
router.post('/', protect, validate(createTaskSchema), taskController.createTask);

// GET  getTask
router.get('/:projectId', protect, taskController.getTasks);


// PATCH updateTask
router.patch('/:id', protect, validate(updateTaskSchema), taskController.updateTask);

// DELETE 
router.delete('/:id', protect, taskController.deleteTask);

export default router;