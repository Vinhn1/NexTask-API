import { z } from 'zod';

// DTO là các đối tượng được thiết kế riêng để vận chuyển dữ liệu giữa các tiến trình (ví dụ từ API Client vào Server). Nó không chứa logic nghiệp vụ, chỉ chứa dữ liệu
export const createProjectSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Tiêu đề dự án phải ít nhất 3 ký tự'),
        description: z.string().max(500, 'Mô tả không được quá 500 ký tự').optional(),
    }),
});

export const updateProjectSchema = z.object({
    params: z.object({
        id: z.string().uuid('ID dự án không hợp lệ'),
    }),
    body: z.object({
        title: z.string().min(3).optional(),
        description: z.string().optional(),
    }),
});