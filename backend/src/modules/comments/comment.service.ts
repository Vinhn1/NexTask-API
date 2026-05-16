import AppError from "../../utils/appError";
import { CreateCommentDto, UpdateCommentDto } from "./comment.dto";
import prisma from "../../lib/prisma";
import { getIO } from "../../lib/io";

export class CommentService {
    // Tạo comment mới
    async createComment(userId: string, data: CreateCommentDto) {
        // Kiểm tra Task có tồn tại không và lấy projectId
        const existingTask = await prisma.task.findUnique({
            where: {
                id: data.taskId
            },
            select: {
                id: true,
                projectId: true
            }
        });

        // Nếu không tồn tại -> báo lỗi
        if(!existingTask){
            throw new AppError('Không tìm thấy công việc để bình luận', 404);
        }

        // Tạo comment mới
        const comment = await prisma.comment.create({
            data: {
                content: data.content,
                taskId: data.taskId,
                userId: userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
                    }
                }
            }
        });

        // --- REAL-TIME (SOCKET.IO) ---
        const io = getIO();
        // Gửi thông báo đến toàn bộ project room
        io.to(`project:${existingTask.projectId}`).emit("comment:new", {
            action: "comment_added",
            taskId: existingTask.id,
            comment: comment
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
                        fullname: true,
                        email: true,
                        avatar: true
                    }
                }
            }
        });

        return comments;
    }

    // Cập nhật comment
    async updateComment(commentId: string, userId: string, data: UpdateCommentDto) {
        // Tìm comment và lấy projectId kèm theo
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                task: {
                    select: { projectId: true }
                },
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
                    }
                }
            }
        });

        if (!comment) {
            throw new AppError("Bình luận không tồn tại", 404);
        }

        // Kiểm tra quyền (chỉ người tạo mới được sửa)
        if (comment.userId !== userId) {
            throw new AppError("Bạn không có quyền chỉnh sửa bình luận này", 403);
        }

        // Cập nhật nội dung
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content: data.content },
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        avatar: true
                    }
                }
            }
        });

        // Real-time notification
        const io = getIO();
        io.to(`project:${comment.task.projectId}`).emit("comment:updated", {
            action: "comment_updated",
            taskId: comment.taskId,
            comment: updatedComment
        });

        return updatedComment;
    }

    // Xóa 1 comment
    async deleteComment(commentId: string, userId: string){
        // Kiểm tra comment có tồn tại không và lấy projectId
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            },
            include: {
                task: {
                    select: { projectId: true }
                }
            }
        });

        // Nếu không tồn tại
        if(!comment){
            throw new AppError("Bình luận không tồn tại", 404);
        }

        // Kiểm tra quyền xóa (chỉ người tạo mới được xóa - Có thể mở rộng cho Project Owner sau này)
        if(comment.userId !== userId){
            throw new AppError('Bạn không có quyền xóa bình luận này', 403);
        }

        // Xóa comment
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        });

        // Real-time notification
        const io = getIO();
        io.to(`project:${comment.task.projectId}`).emit("comment:deleted", {
            action: "comment_deleted",
            taskId: comment.taskId,
            commentId: commentId
        });

        // Trả kết quả
        return {
            message: 'Bình luận đã được xóa thành công'
        }
    }
}