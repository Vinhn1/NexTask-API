import prisma from "../../lib/prisma";
import AppError from "../../utils/appError";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { getIO } from "../../lib/io";

export class TaskService {
    // Tạo mới Task 
    async createTask(userId: string, data: CreateTaskDto) {

        const {projectId, dueDate, assigneeId, ...taskData } = data;
       

        //  Kiểm tra Project và Quyền hạn cùng lúc 
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
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

         // Tìm Task cuối bảng
        const lastTask = await prisma.task.findFirst({
            where: {
                projectId,
                status: data.status || "TODO",
                deletedAt: null
            },
            orderBy: {
                position: 'desc'
            },
            select: {
                position: true
            }
        })

        // Tính toán newPosition 
        const step = 1024; // Khoảng cách an toàn để chèn vào giữa
        const newPosition = lastTask ? lastTask.position + step : step;

        // Tiến hành tạo Task
        const newTask = await prisma.task.create({
            data: {
                ...taskData,
                dueDate: dueDate ? new Date(dueDate) : null,
                project: { 
                    connect: {
                        id: projectId
                    }
                },
                ...(assigneeId && {assignee: {connect: {id: assigneeId}}}),
                position: newPosition
            }
        });

        // --- REAL-TIME (SOCKET.IO) ---
        const io = getIO();
        
        // 1. Thông báo cho cả dự án có Task mới
        io.to(`project:${newTask.projectId}`).emit("task:created", {
            action: "task_created",
            taskId: newTask.id,
            task: newTask
        });

        // 2. Nếu có gán người thực hiện, gửi thông báo riêng cho họ
        if (newTask.assigneeId) {
            io.to(`user:${newTask.assigneeId}`).emit("notification", {
                type: "TASK_ASSIGNED",
                message: `Bạn đã được gán một công việc mới: "${newTask.title}"`,
                taskId: newTask.id,
                task: newTask
            });
        }

        return newTask;
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
                    position: 'asc'
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

    // Update Task
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
        const isMember = task.project.members.length > 0;

        if(!isOwner && !isMember)
            throw new AppError("Bạn không có quyền chỉnh sửa Task này", 403) ;

        // Tiến hành update
        const { dueDate: updateDueDate, projectId: updateProjectId, assigneeId: updateAssigneeId, ...updateData } = data;
        
        const updatedTask = await prisma.task.update({
            where: { id: taskId},
            data: {
                ...updateData,
                ...(updateDueDate !== undefined && { dueDate: updateDueDate ? new Date(updateDueDate) : null }),
                ...(updateProjectId && { project: { connect: { id: updateProjectId } } }),
                ...(updateAssigneeId && { assignee: { connect: { id: updateAssigneeId } } }),
            }
        });



        // --- BẮT ĐẦU LOGIC REAL-TIME (SOCKET.IO) ---
        const io = getIO();

        // Xác định loại hành động để frontend xử lý hiệu ứng mượt
        let action = "task_update";
        
        if(data.status && data.position !== undefined){
            // Di chuyển sang cột khác
            action = "task_moved_alt_column";
        }else if(data.position !== undefined){
            // Chỉ thay đổi thứ tự trong cùng cột
            action = "task_reordered";
        }else if(data.status){
            action = "status_changed";
        }

        // 1. Gửi sự kiện cập nhật đến toàn bộ thành viên trong dự án
        io.to(`project:${updatedTask.projectId}`).emit("task:updated", {
            action,
            taskId: updatedTask.id,
            newStatus: updatedTask.status,
            updatedTask,
        });

        // 2. Gửi thông báo riêng cho người được gán (Assignee) nếu có thay đổi người gán
        if (updateAssigneeId && updatedTask.assigneeId) {
            io.to(`user:${updatedTask.assigneeId}`).emit("notification", {
                type: "TASK_ASSIGNED",
                message: `Bạn đã được gán công việc: "${updatedTask.title}"`,
                taskId: updatedTask.id,
                updatedTask
            });
        }
        // --- KẾT THÚC LOGIC REAL-TIME ---

        return updatedTask;
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

        const deletedTask = await prisma.task.update({
            where: { id: taskId },
            data: {
                deletedAt: new Date()
            }
        });

        // --- REAL-TIME (SOCKET.IO) ---
        const io = getIO();
        // Thông báo cho cả dự án rằng Task đã bị xóa
        io.to(`project:${deletedTask.projectId}`).emit("task:deleted", {
            action: "task_deleted",
            taskId: deletedTask.id
        });

        return deletedTask;
    }
}