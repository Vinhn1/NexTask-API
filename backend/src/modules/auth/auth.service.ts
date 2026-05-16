import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppError from "../../utils/appError";

type TokenUser = {
    id: string;
    refreshTokenVersion: number;
};

export class AuthService {
    private signTokens(user: TokenUser) {
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

        if (!user) {
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
}

export const authService = new AuthService();
