import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        email: z.string().email('Email không đúng định dạng'),
        password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
        fullname: z.string().optional()
    })
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Email không đúng định dạng'),
        password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự'),
    })
})