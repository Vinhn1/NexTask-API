// Middleware dùng để kiểm tra dữ liệu đầu vào (validation) trước khi request đi vào controller 
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            
            // Sử dụng schema.parseAsync để kiểm tra req.body, req.query, hoặc req.params 
            // validate dữ liệu từ request 
            const result = await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            }) as any;

            // Gán ngược lại để Controller nhận được dữ liệu "sạch" và đúng kiểu
            Object.assign(req.body, result.body);
            Object.assign(req.query, result.query);
            Object.assign(req.params, result.params);

            // Nếu validate thành công -> cho request đi tiếp 
            next();

        }catch(error){
            next(error);
        }
    }
}