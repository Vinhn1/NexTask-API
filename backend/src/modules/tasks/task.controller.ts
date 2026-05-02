import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { catchAsync } from '../../utils/catchAsync';
import { createTaskSchema, updateTaskSchema } from './task.dto';
import { ApiResponse } from '../../utils/apiResponse';


const taskService = new TaskService();

export class TaskController {
    createTask = catchAsync(async (req: Request, res: Response) => {

        // Lấy thông tin user hiện tại 
        const userId = req.user!.id;

        // Gọi Service để xử lý logic nghiệp vụ 
        const newTask = await taskService.createTask(userId, req.body);

        // Trả về kết quả 
        return ApiResponse.success(
            res,
            'Tạo Task thành công',
            newTask,
            201
        )
    });

    // Lấy danh sách Task
    getTasks = catchAsync(async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const userId = req.user!.id;
        const { status, priority } = req.query;

        const filters = {
            status: status as string,
            priority: priority as string
        }

        // Lấy và ép kiểu page, limit
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        // Gọi Service với 4 tham số
        const result = await taskService.getAllTasksByProject(projectId, userId, page, limit, filters);

        // Trả về kết quả 
        res.status(200).json({
            status: 'success',
            data: result.tasks,
            pagination: result.pagination
        })
    })

    // Update
    updateTask = catchAsync(async (req: Request, res: Response) => {
        // Lấy TaskId
        const { taskId } = req.params;

        // Lấy UserId
        const userId = req.user!.id;


        // Gọi Service
        const task = await taskService.updateTask(taskId, userId, req.body);

        // Trả về res
        return ApiResponse.success(
            res,
            'Update Task thành công',
            task,
            200
        )
    })

    // Delete 
    deleteTask = catchAsync(async (req: Request, res: Response) => {
        // Lấy taskId từ params
        const { taskId } = req.params;
        // Lấy userId từ user 
        const userId = req.user!.id;

        // gọi service
        await taskService.deleteTask(taskId, userId);

        res.status(204).send();
    })
}