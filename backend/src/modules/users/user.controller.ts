import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/appError';
import { userService } from './user.service';

export class UserController {
    updateAvatar = catchAsync(async (req: Request, res: Response) => {
        // Kiểm tra nếu không có file (req.file undefined) thì báo lỗi 400
        if(!req.file){
            throw new AppError('Vui lòng upload ảnh đại diện', 400);
        }

        // Tạo đường dẫn ảnh (/pubic/images/${req.file.filename})
        const avatarPath = `/public/images/${req.file.filename}`;
        const userId = req.user!.id;

        // Gọi userService.updateAvatar với:
        // userId (lấy từ req.user!.id) và avatarPath vừa tạo
        const user = await userService.updateAvatar(userId, avatarPath);

        // Trả về res thành công 
        res.status(200).json({
            success: true,
            message: 'Cập nhật avatar thành công.',
            data: user
        });
    });
}

export const userController = new UserController();
