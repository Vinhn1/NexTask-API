import prisma from "../../lib/prisma";
import AppError from "../../utils/appError";
import { CreateTaskDto } from "./task.dto";

export class TaskService {
    // Tạo mới Task 
    async createTask(userId: string, data: CreateTaskDto) {
        //  Kiểm tra Project và Quyền hạn cùng lúc 
        const project = await prisma.project.findFirst({
            where: {
                id: data.projectId,
                // Chỉ cho tạo task trong project chưa bị xóa mềm
                deletedAt: null,
                OR: [
                    // Là chủ project
                    { ownerId: userId },
                    // Hoặc là thành viên
                    { members: {some: { id: userId}}}
                ]
            }
        });

        if(!project){
            throw new AppError("Project không tồn tại hoặc bạn không có quyền truy cập", 404);
        }

        // Tiến hành tạo Task
        return await prisma.task.create({
            data: {
                ...data,
                dueDate: data.dueDate ? new Date(data.dueDate) : null,
            }
        })
    }

    // GetALL Task 
    async getAllTasksByProject(projectId: string, userId: string){
        // Kiểm tra xem user có quyền xem project này không 
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                deletedAt: null,
                 OR: [
                    // Là chủ project
                    { ownerId: userId },
                    // Hoặc là thành viên
                    { members: {some: { id: userId}}}
                ]
            }
        })

        if(!project){
            throw new AppError("Project không tồn tại hoặc bạn không có quyền truy cập", 404);
        }

        // Nếu có quyền mới đi lấy Task 
        return await prisma.task.findMany({
            where: {
                projectId: projectId,
                deletedAt: null
            },
            orderBy: {
                createdAt: 'desc' // Sắp xếp cái mới nhất lên đầu 
            }
        })

    }
}