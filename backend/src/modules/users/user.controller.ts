import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/appError';
import { userService } from './user.service';
import { deleteFile } from '../../utils/file.util';

export class UserController {
    updateAvatar = catchAsync(async (req: Request, res: Response) => {
        // Kiểm tra nếu không có file (req.file undefined) thì báo lỗi 400
        if(!req.file){
            throw new AppError('Vui lòng upload ảnh đại diện', 400);
        }

        // Tạo đường dẫn ảnh (/pubic/images/${req.file.filename})
        const avatarPath = `/images/${req.file.filename}`;
        const userId = req.user!.id;

        // Tìm user hiện tại trong DB để lấy cái avatar Cũ 
        const currentUser = await userService.getUserById(userId);
        const oldAvatar = currentUser.avatar;

        // Gọi userService.updateAvatar với:
        // userId (lấy từ req.user!.id) và avatarPath vừa tạo
        const user = await userService.updateAvatar(userId, avatarPath);

        // Nếu cập nhật DB thành công và user đó có avatar cũ, thì xóa nó đi 
        if(oldAvatar){
            deleteFile(oldAvatar);
        }

        // Trả về res thành công 
        res.status(200).json({
            success: true,
            message: 'Cập nhật avatar thành công.',
            data: user
        });
    });
}

export const userController = new UserController();
