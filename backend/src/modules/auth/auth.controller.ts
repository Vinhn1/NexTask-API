// Nơi tiếp nhận Request và gửi Response (Lễ tân)
import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try{
            const { email, password, fullname } = req.body;
            const result = await authService.register({ email, password, fullname });
            res.status(201).json({
                status: 'success',
                message: 'Đăng ký tài khoản thành công!',
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try{
            const result = await authService.login(req.body);
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
            const userId = (req as any).user.id;
            const user = await authService.getMe(userId);
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
            const userId = (req as any).user.id;
            const result = await authService.logout(userId);
            res.status(200).json({
                status: 'success',
                message: result.message
            });
        }catch(error){
            next(error);
        }
    }

    async socialLoginSuccess(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as any).user;
            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/login?error=auth_failed`);
            }

            const tokens = authService.signTokens(user);

            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3001'}/social-callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const result = await authService.forgotPassword(email);
            res.status(200).json({
                status: 'success',
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const result = await authService.resetPassword(token, password);
            res.status(200).json({
                status: 'success',
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
