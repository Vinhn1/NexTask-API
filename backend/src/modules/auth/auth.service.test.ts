import { authService } from "./auth.service";
import prisma from "../../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Mocking dependencies
jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}));

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

describe('AuthService - Unit Test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_ACCESS_TOKEN = 'fake_access_secret';
        process.env.JWT_REFRESH_TOKEN = 'fake_refresh_secret';
    });

    describe('register()', () => {
        it('nên tạo user mới thành công khi dữ liệu hợp lệ', async () => {
            const mockUserData = {
                email: 'test@gmail.com',
                password: 'password123',
                fullname: 'Test User'
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password_xyz');
            (prisma.user.create as jest.Mock).mockResolvedValue({
                id: '1',
                email: mockUserData.email,
                fullname: mockUserData.fullname,
                passwordHash: 'hashed_password_xyz',
                createdAt: new Date(),
            });

            const result = await authService.register(mockUserData);

            // Đảm bảo không lộ passwordHash ra ngoài
            expect(result).not.toHaveProperty('passwordHash');
            // Kiểm tra create được gọi với passwordHash đã mock
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    passwordHash: 'hashed_password_xyz',
                }),
            });
        });

        it('nên quăng lỗi nếu email đã tồn tại', async () => {
            const mockUserData = {
                email: 'exist@gmail.com',
                password: 'secret',
                fullname: 'Exist User'
            };

            // Giả lập email đã tồn tại
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: '99',
                email: mockUserData.email,
            });

            // Service phải ném lỗi
            await expect(authService.register(mockUserData)).rejects.toThrow('Email đã tồn tại!');

            // create không được gọi
            expect(prisma.user.create).not.toHaveBeenCalled();
        });
    });

    describe('login()', () => {
        const mockUserInDb = {
            id: '1',
            email: 'test@gmail.com',
            fullname: 'Test User',
            passwordHash: 'hashed_password_xyz',
            createdAt: new Date(),
        };

        it('nên đăng nhập thành công và trả về tokens', async () => {
            const loginData = { email: 'test@gmail.com', password: 'password123' };

            // Tìm thấy user
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserInDb);
            // Mật khẩu đúng
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            // Giả lập jwt.sign trả về token giả
            const mockAccessToken = 'fake_access_token_123';
            const mockRefreshToken = 'fake_refresh_token_456';
            (jwt.sign as jest.Mock)
                .mockReturnValueOnce(mockAccessToken)
                .mockReturnValueOnce(mockRefreshToken);

            const result = await authService.login(loginData);

            // Kiểm tra kết quả
            expect(result).toHaveProperty('accessToken', mockAccessToken);
            expect(result).toHaveProperty('refreshToken', mockRefreshToken);
            expect(result).not.toHaveProperty('passwordHash');
            if (result.user) {
                expect(result.user).toHaveProperty('email', loginData.email);
                expect(result.user).not.toHaveProperty('passwordHash');
            }

            // Kiểm tra tương tác với dependency
            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { email: loginData.email },
            });
            expect(bcrypt.compare).toHaveBeenCalledWith(
                loginData.password,
                mockUserInDb.passwordHash
            );
            expect(jwt.sign).toHaveBeenCalledTimes(2);
            expect(jwt.sign).toHaveBeenNthCalledWith(
                1,
                expect.objectContaining({ userId: mockUserInDb.id }),
                expect.any(String),
                expect.any(Object)
            );
        });

        it('nên quăng lỗi nếu sai mật khẩu', async () => {
            const loginData = { email: 'test@gmail.com', password: 'wrongPassword' };

            // Tìm thấy user nhưng mật khẩu sai
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserInDb);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(authService.login(loginData))
                .rejects
                .toThrow("Email hoặc mật khẩu không chính xác!");

            expect(prisma.user.findUnique).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith(
                loginData.password,
                mockUserInDb.passwordHash
            );

            expect(jwt.sign).not.toHaveBeenCalled();
        });

        it('nên quăng lỗi nếu email không tồn tại', async () => {
            const loginData = { email: 'notfound@gmail.com', password: 'anything' };

            // Không tìm thấy user
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(authService.login(loginData))
                .rejects
                .toThrow("Thông tin đăng nhập không chính xác"); // hoặc thông báo lỗi phù hợp

            // Đảm bảo không kiểm tra mật khẩu hay tạo token
            expect(bcrypt.compare).not.toHaveBeenCalled();
            expect(jwt.sign).not.toHaveBeenCalled();
        });
    });
});