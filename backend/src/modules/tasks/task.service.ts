import prisma from "../../lib/prisma";
import AppError from "../../utils/appError";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

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
    async getAllTasksByProject(projectId: string, userId: string, page: number = 1, limit: number = 10, filters: {
        status?: string,
        priority?: string
    } = {}){

        const skip = (page - 1) * limit;
        const take = limit;

        // Tạo obj điều kiện lọc cho Prisma
        const whereCondition: any = {
            projectId,
            deletedAt: null,
            // Rải các filter vào 
            ...filters
        };

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
        const [tasks, total] = await Promise.all([
            prisma.task.findMany({
                where: whereCondition,
                skip: skip,
                take: take,
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.task.count ({
                where: whereCondition
            })
        ]);

        // Trả về kết quả kèm metadata
        return {
            tasks,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };

    }

    // Update
    async updateTask(taskId: string, userId: string, data: UpdateTaskDto) {
        // Tìm task kèm theo thông tin Project của nó 
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                deletedAt: null
            },
            // Lấy luôn thông tin Project để check quyền 
            include: {
                project: {
                    include: {
                        members: {
                            where: {
                                // Chỉ lấy thành viên nếu Id khớp với user đang đăng nhập 
                                id: userId
                            }
                        }
                    }
                }
            }
        });

        if(!task){
            throw new AppError("Không tìm thấy Task", 404);
        }
        
        // Check quyền: User có thuộc Project của Task này không?
        const isOwner = task.project.ownerId === userId;
        // Kiểm tra trong mảng members
        const isMember = task.project.members.length > 0;

        if(!isOwner && !isMember)
            throw new AppError("Bạn không có quyền", 403) ;

        // Tiến hành update
        return await prisma.task.update({
            where: { id: taskId},
            data: {
                // Copy các trường từ DTO sang 
                ...data,
                // Riêng dueDate cần xử lý đặc biệt để Prisma hiểu kiểu Date
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined
            }
        });
    }

    // Delete
    async deleteTask(taskId: string, userId: string){
        // Tìm task kèm theo thông tin Project của nó 
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                deletedAt: null
            },
            // Lấy luôn thông tin Project để check quyền 
            include: {
                project: {
                    include: {
                        members: {
                            where: {
                                // Chỉ lấy thành viên nếu Id khớp với user đang đăng nhập 
                                id: userId
                            }
                        }
                    }
                }
            }
        });

        if(!task){
            throw new AppError("Không tìm thấy Task", 404);
        }
        
        // Check quyền: User có thuộc Project của Task này không?
        const isOwner = task.project.ownerId === userId;
        // Kiểm tra trong mảng members
        const isMember = task.project.members.length > 0;

        if(!isOwner && !isMember)
            throw new AppError("Bạn không có quyền", 403) ;

        return await prisma.task.update({
            where: { id: taskId },
            data: {
                deletedAt: new Date()
            }
        })
    }
}