import crypto from 'crypto';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from "../../utils/appError";
import { sendEmail } from '../../utils/mail';

type TokenUser = {
    id: string;
    refreshTokenVersion: number;
};

export class AuthService {
    public signTokens(user: TokenUser) {
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_ACCESS_TOKEN as string,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            {
                userId: user.id,
                version: user.refreshTokenVersion
            },
            process.env.JWT_REFRESH_TOKEN as string,
            { expiresIn: '7d' }
        );

        return { accessToken, refreshToken };
    }

    async register(data: any) {
        const { email, password, fullname } = data;
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            throw new AppError("Email đã tồn tại!", 409);
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullname,
            }
        });

        const { passwordHash: _, ...userWithoutPassword } = newUser;

        return {
            user: userWithoutPassword,
            ...this.signTokens(newUser)
        };
    }

    async login(data: any) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.passwordHash) {
            throw new AppError("Email hoặc mật khẩu không chính xác!", 401);
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new AppError("Email hoặc mật khẩu không chính xác!", 401);
        }

        const { passwordHash: _, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            ...this.signTokens(user)
        };
    }

    async getMe(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullname: true,
                avatar: true,
                role: true,
                bio: true,
                jobTitle: true,
                department: true,
                createdAt: true
            }
        });

        if (!user) {
            throw new AppError('Người dùng không tồn tại!', 404);
        }

        return user;
    }

    async logout(userId: string) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                refreshTokenVersion: {
                    increment: 1
                }
            }
        });

        return {
            message: 'Đăng xuất thành công!'
        };
    }

    async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError('Không tìm thấy người dùng với email này!', 404);
        }

        // Tạo token ngẫu nhiên
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Hash token để lưu vào DB (bảo mật hơn)
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Lưu vào DB với thời hạn 10 phút
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: hashedToken,
                passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000)
            }
        });

        // Gửi email
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
        
        const message = `
            <h1>Bạn đã yêu cầu đặt lại mật khẩu</h1>
            <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu. Link này có hiệu lực trong 10 phút.</p>
            <a href="${resetUrl}" style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
            <p>Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: '[NexTask] Đặt lại mật khẩu của bạn',
                message
            });
        } catch (error) {
            // Nếu gửi mail lỗi, xóa token trong DB
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    passwordResetToken: null,
                    passwordResetExpires: null
                }
            });
            throw new AppError('Có lỗi khi gửi email. Vui lòng thử lại sau!', 500);
        }

        return { message: 'Link đặt lại mật khẩu đã được gửi vào email của bạn!' };
    }

    async resetPassword(token: string, password: any) {
        // Hash token nhận được để so sánh với bản lưu trong DB
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Tìm user có token khớp và chưa hết hạn
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            throw new AppError('Token không hợp lệ hoặc đã hết hạn!', 400);
        }

        // Cập nhật mật khẩu mới và xóa token
        const passwordHash = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                passwordResetToken: null,
                passwordResetExpires: null,
                refreshTokenVersion: { increment: 1 } // Đăng xuất khỏi mọi thiết bị
            }
        });

        return { message: 'Đặt lại mật khẩu thành công!' };
    }
}

export const authService = new AuthService();
