import AppError from "../../utils/appError";
import { CreateCommentDto } from "./comment.dto";
import prisma from "../../lib/prisma";

export class CommentService {
    // Tạo comment mới
    async createComment(userId: string, data: CreateCommentDto) {
        // Kiểm tra Task có tồn tại không
        const existingTask = await prisma.task.findUnique({
            where: {
                id: data.taskId
            }
        });

        // Nếu không tồn tại -> báo lỗi
        if(!existingTask){
            throw new AppError('Task not found', 404);
        }

        // Tạo comment mới
        const comment = await prisma.comment.create({
            data: {
                content: data.content,
                taskId: data.taskId,
                userId: userId
            }
        });

        return comment;
    }

    // Trả về danh sách comment của 1 Task
    async getCommentsByTask(taskId: string){
        // Kiểm tra task có tồn tại không 
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });

        // Nếu task không tồn tại -> báo lỗi
        if(!task)
            throw new AppError('Task not found', 404);
        
        // Lấy danh sách comment theo taskId
        const comments = await prisma.comment.findMany({
            where: {
                taskId: taskId
            },
            // Sắp xếp comment mới nhất lên đầu
            orderBy: {
                createdAt: 'desc'
            },

            // Lấy thêm thông tin user viết comment
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

        return comments;
    }

    // Xóa 1 comment
    async deleteComment(commentId: string, userId: string){
        // Kiểm tra comment có tồn tại không 
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        });

        // Nếu comment tồn tại
        if(!comment){
            throw new AppError("Comment not found", 404);
        }

        // Kiểm tra quyền xóa
        // Chỉ người tạo comment mới được xóa
        if(comment.userId !== userId){
            throw new AppError('Bạn không có quyền xóa comment', 403);
        }

        // Xóa comment
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        });

        // Trả kết quả
        return {
            message: 'Comment đã được xóa thành công'
        }
    }
}