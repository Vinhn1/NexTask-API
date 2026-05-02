import { Request, Response, NextFunction } from 'express';
import { CommentService } from './comment.service';
import { catchAsync } from '../../utils/catchAsync';
import { ApiResponse } from '../../utils/apiResponse';

const commentService = new CommentService();

export class CommentController {
    // Tạo comment mới
    createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // userId 
        const userId = req.user!.id;

        // Gọi service
        const comment = await commentService.createComment(userId, req.body);

        // Trả về res
        return ApiResponse.success(
            res,
            'Comment đã tạo thành công',
            comment,
            201
        );
    })

    // Lấy ds theo task
    getCommentsByTask = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Lấy taskId từ params
        const { taskId } = req.params;

        // Gọi service
        const comment = await commentService.getCommentsByTask(taskId);

        // Trả về res
        return ApiResponse.success(
            res,
            'Lấy danh sách comment thành công',
            comment
        );
    })

    // Xóa comment
    deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Lấy commentId từ params
        const { commentId } = req.params;

        // userId 
        const userId = req.user!.id;

        // Gọi service
        const result = await commentService.deleteComment(commentId, userId);

        // Trả về res
        return ApiResponse.success(
            res,
            result.message,
            null
        );
    })
}