import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import AppError from '../../utils/appError';
import { userService } from './user.service';
import { ApiResponse } from '../../utils/apiResponse';

export class UserController {
    updateProfile = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const user = await userService.updateProfile(userId, req.body);

        return ApiResponse.success(res, 'Cap nhat ho so thanh cong', user);
    });

    updateAvatar = catchAsync(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new AppError('Vui lòng upload ảnh đại diện', 400);
        }

        // Cloudinary trả về URL đầy đủ qua req.file.path
        const avatarUrl = req.file.path;
        const userId = req.user!.id;

        // Cập nhật avatar URL vào DB (Cloudinary quản lý asset, không cần xóa file local)
        const user = await userService.updateAvatar(userId, avatarUrl);

        return ApiResponse.success(res, 'Cập nhật avatar thành công', user);
    });
}

export const userController = new UserController();
