import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { catchAsync } from '../../utils/catchAsync';
import { createTaskSchema, updateTaskSchema } from './task.dto';


const taskService = new TaskService();

export class TaskController {
    createTask = catchAsync(async (req: Request, res: Response) => {
        // Validate dữ liệu từ client 
        const validatedData = createTaskSchema.parse(req.body);

        // Lấy thông tin user hiện tại 
        const userId = req.user!.id;

        // Gọi Service để xử lý logic nghiệp vụ 
        const newTask = await taskService.createTask(userId, validatedData);

        // Trả về kết quả 
        res.status(201).json({
            status: 'success',
            data: newTask
        });
    });

    // Lấy danh sách Task
    getTasks = catchAsync(async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const userId = req.user!.id;

        const tasks = await taskService.getAllTasksByProject(projectId, userId);

        res.status(200).json({
            status: 'success',
            result: tasks.length,
            data: tasks

        })
    })

    // Update
    updateTask = catchAsync(async (req: Request, res: Response) => {
        // Lấy TaskId
        const { taskId } = req.params;

        // Lấy UserId
        const userId = req.user!.id;

        // Validate body với updateTaskSchema
        const validatedData =  updateTaskSchema.parse(req.body);

        // Gọi Service
        const task = await taskService.updateTask(taskId, userId, validatedData);

        // Trả về res
        res.status(200).json({
            status: 'success',
            data: task
        });
    })
}