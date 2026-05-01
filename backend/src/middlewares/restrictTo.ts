// File chịu trách nhiệm Authorization (Phân quyền)
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

// Hàm nhận vào 1 mảng các chuỗi (các role được phép)
export const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
        // Kiểm tra xem req.user có tồn tại không 
        // Nếu protect middleware chạy đúng, req.user chắc chắn có 
        if(!req.user){
            return next(new AppError('Bạn chưa đăng nhập!', 401));
        }

        // Kiểm tra xem role của user hiện tại (req.user.role)
        // có nằm trong danh sách 'roles' được phép hay không?
        if(!roles.includes(req.user.role as string)){
            return next(new AppError('Bạn không có quyền thực hiện hành động này!', 403));
        }

        // Nếu mọi thứ ổn, cho phép đi tiếp
        next();
    }
}