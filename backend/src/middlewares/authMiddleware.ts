import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Lấy token từ headers Authorization
        const authHeader = req.headers.authorization;

        let token;

        if(authHeader && authHeader.startsWith('Bearer')){
            // Dùng hàm split(' ') để tách chuỗi token sau chữ 'Bearer'
            token = authHeader.split(' ')[1];
        }

        // Kiểm tra nếu không có token 
        if(!token){
            return next(new AppError('Bạn chưa đăng nhập! Vuiv lòng đăng nhập để tiếp tục.', 401));
        }

        // Xác thực token (sử dụng jwt.verify)
        // Payload trả về sẽ chứa thông tin userId mà đã ký lúc login 
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string) as any;

        // Nếu thông tin user vào request để các hàm sau sử dụng 
        // Ép kiểu req thành any để tránh lỗi TypeScript 
        (req as any).user = { id: decoded.userId };

        // Cho phép req đi tiếp 
        next();

    }catch(error){
        // Nếu có lỗi (token hết hạn, token giả...), trả về lỗi 401 
        next(new AppError('Token không hợp lệ hoặc đã hết hạn!', 401));
    }
}