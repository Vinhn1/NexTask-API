import prisma from "../../lib/prisma";
import { AppError } from '../../utils/appError';

export class UserService {
    async updateAvatar(userId: string, avatarPath: string){
        // Kiểm tra xem User có tồn tại trong DB không
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user){
            throw new AppError('Người dùng không tồn tại', 404);
        }

        // Thực hiện cập nhật trường avatar
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                avatar: avatarPath
            },
            // Chỉ trả về những thông tin cần thiết, không trả về mật khẩu
            select: {
                id: true,
                email: true,
                fullname: true,
                avatar: true,
                role: true
            }
        });
    }
}

export const userService = new UserService();