import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import prisma from '../lib/prisma';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Lấy token từ headers Authorization
        const authHeader = req.headers.authorization;

        // Đảm bảo authHeader là string (tránh trường hợp mảng)
        const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
        let token;

        if(headerStr && (headerStr.startsWith('Bearer') || headerStr.startsWith('bearer'))){
            // Dùng split để tách chuỗi token sau chữ 'Bearer' hoặc 'bearer'
            token = headerStr.split(' ')[1];
        }

        // Kiểm tra nếu không có token 
        if(!token){
            return next(new AppError('Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục.', 401));
        }

        // Xác thực token (sử dụng jwt.verify)
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string) as any;

        const currentUser = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        // Kiểm tra xem user có thực sự tồn tại không 
        if(!currentUser){
            return next(new AppError('Người dùng sở hữu token này không còn tồn tại!', 401));
        }

        // Gán user từ DB vào req.user để các hàm sau (phân quyền) có thể dùng role
        req.user = currentUser;

        // Cho phép req đi tiếp 
        next();

    }catch(error){
        // Nếu có lỗi (token hết hạn, token giả...), trả về lỗi 401 
        next(new AppError('Token không hợp lệ hoặc đã hết hạn!', 401));
    }
}