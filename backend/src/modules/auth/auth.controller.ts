// Nơi tiếp nhận Request và gửi Response (Lễ tân)
import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try{

            // Lấy dữ liệu từ req.body
            const { email, password, fullname } = req.body;

            // Gọi service để thực hiện đăng kí (truyền obj chứa các trường vào)
            const user = await authService.register({ email, password, fullname });

            // Nếu thành công trả về response với status 201 (Created)
            res.status(201).json({
                status: 'success',
                message: 'Đăng ký tài khoản thành công!',
                data: {user}
            });

        }catch(error){
            // Nếu có lỗi (email trùng, lỗi DB... ), đẩy lỗi sang Middleware xử lý 
            next(error);
        }
    }

    // Login
    async login(req: Request, res: Response, next: NextFunction){
        try{

            //  Gọi service 
            const result = await authService.login(req.body);

            // Trả về response
            res.status(200).json({
                status: 'success',
                message: 'Đăng nhập thành công',
                data: result
            }) 

        }catch(error){
            next(error);
        }
    }

    async getMe(req: Request, res: Response, next: NextFunction){
        try{

            //  Lấy id từ "con dấu" mà Middleware protect đã để lại 
            const userId = (req as any).user.id;

            // Gọi service để lấy thông tin chi tiết User từ DB 
            const user = await authService.getMe(userId);

            // Trả về kết quả 
            res.status(200).json({
                status: 'success',
                data: { user }
            });
        }catch(error){
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try{
            // Lấy userId từ token (đã được middleware protect xử lý)
            const userId = (req as any).user.id;

            // Gọi Service để thực hiện logic logout (tăng version token DB)
            const result = await authService.logout(userId);

            // Trả về phản hồi cho Client 
            res.status(200).json({
                status: 'success',
                message: result.message
            });

        }catch(error){
            next(error);
        }

    }
}

export const authController = new AuthController();