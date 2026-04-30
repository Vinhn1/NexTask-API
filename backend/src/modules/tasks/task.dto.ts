import { z } from 'zod';

// ENUM cho độ ưu tiên
export const priorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

// Định nghĩa Schema (Dùng validate lúc run time)
export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Tiêu đề không được để trống",
    }).min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(100),
    
    projectId: z.string().uuid("ProjectId không đúng định dạng UUID"),
    // .optional() vì DB đã có default hoặc cho phép null
    priority: priorityEnum.optional(),
    status: statusEnum.optional(),

    // .datetime() và .optional vì DB là DateTime 
    dueDate: z.string().datetime("Hạn hoàn thành phải đúng định dạng ISO").optional().nullable(),
    
    // Có thể thêm assigneeId nếu muốn giao việc ngay lúc tạo
    assigneeId: z.string().uuid().optional(),

});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;