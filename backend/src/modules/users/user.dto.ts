import { z } from 'zod';

export const updateProfileSchema = z.object({
    body: z.object({
        fullname: z.string().min(2, 'Ten phai co it nhat 2 ky tu').max(120).optional(),
        bio: z.string().max(1000, 'Bio khong duoc qua 1000 ky tu').optional().nullable(),
        jobTitle: z.string().max(120).optional().nullable(),
        department: z.string().max(120).optional().nullable(),
    }),
});
