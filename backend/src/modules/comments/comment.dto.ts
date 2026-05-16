import { z } from 'zod';

export const createCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, 'Nội dung comment không được để trống').max(1000, 'Comment tối đa 1000 ký tự'),
        taskId: z.string().uuid('taskId phải là uuid hợp lệ')
    })
})

export const updateCommentSchema = z.object({
    body: z.object({
        content: z.string().min(1, 'Nội dung comment không được để trống').max(1000, 'Comment tối đa 1000 ký tự')
    })
})

export type CreateCommentDto = z.infer<typeof createCommentSchema>['body'];
export type UpdateCommentDto = z.infer<typeof updateCommentSchema>['body'];