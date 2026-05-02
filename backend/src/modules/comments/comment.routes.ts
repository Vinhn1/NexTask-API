import { Router } from 'express'
import { CommentController } from './comment.controller'
import { protect } from '../../middlewares/authMiddleware';
import { validate } from '../../middlewares/validate';
import { createCommentSchema } from './comment.dto';

const router = Router();
const commentController = new CommentController();

// Bảo vệ tất cả route 
router.use(protect);

// Tạo comment
router.post('/', validate(createCommentSchema), commentController.createComment);

// Lấy ds comment
router.get('/task/:taskId', commentController.getCommentsByTask);

// Xóa comment
router.delete('/:commentId', commentController.deleteComment);

export default router;