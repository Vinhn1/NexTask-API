import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { catchAsync } from '../../utils/catchAsync';
import { createTaskSchema } from './task.dto';


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
}