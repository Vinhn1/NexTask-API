import { z } from 'zod';

// ENUM cho độ ưu tiên
export const priorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH']);
export const statusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);

// Định nghĩa Schema (Dùng validate lúc run time)
export const createTaskSchema = z.object({
    body: z.object({
        // Zod v4 bỏ required_error, dùng .min(1) thay thế
        title: z.string().min(1, "Tiêu đề không được để trống").min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(100),
    
        projectId: z.string().uuid("ProjectId không đúng định dạng UUID"),
        priority: priorityEnum.optional(),
        status: statusEnum.optional(),
        position: z.number().optional(),
        dueDate: z.string().datetime("Hạn hoàn thành phải đúng định dạng ISO").optional().nullable(),
        assigneeId: z.string().uuid().optional(),
    })
    
});


export const updateTaskSchema = z.object({
    params: z.object({
        taskId: z.string().uuid('ID công việc không hợp lệ'),
    }),
    body: createTaskSchema.shape.body.partial(),
})

// Trích xuất type của body để Service nhận object phẳng, không bị bọc trong { body: ... }
export type CreateTaskDto = z.infer<typeof createTaskSchema>['body'];
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>['body'];