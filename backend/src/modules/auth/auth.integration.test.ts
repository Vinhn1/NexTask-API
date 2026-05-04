import request from 'supertest';
import app from '../../app';
import prisma from '../../lib/prisma';

describe('Auth Module (Integration)', () => {
    // Teardown: Xóa sạch db trước khi chạy bộ test
    // Phải xóa theo đúng thứ tự FK: comment -> task -> project -> user
    beforeAll(async () => {
        await prisma.comment.deleteMany();
        await prisma.task.deleteMany();
        // Xóa quan hệ members trước khi xóa project
        await prisma.$executeRaw`DELETE FROM "_ProjectMembers"`;
        await prisma.project.deleteMany();
        await prisma.user.deleteMany();
    })

    describe('POST /api/v1/auth/register', () => {
        it('nên đăng ký thành công và lưu vào database thật', async () => {
            const newUser = {
                email: 'integration@gmail.com',
                password: 'Password123!',
                fullname: 'Integration Test'
            };

            const response = await request(app).post('/api/v1/auth/register').send(newUser);

            // Kiểm tra HTTP Status
            expect(response.status).toBe(201);

            // Kiểm tra dữ liệu trong db thật 
            const userInDb = await prisma.user.findUnique({
                where: {
                    email: newUser.email
                }
            });

            expect(userInDb).not.toBeNull();
            expect(userInDb?.fullname).toBe(newUser.fullname);
        });

        it('nên trả về lỗi 409 nếu email đã tồn tại', async () => {
            const duplicateUser = {
                email: 'integration@gmail.com',
                password: 'Password123!',
                fullname: 'Integration Test'
            };
            const response = await request(app).post('/api/v1/auth/register').send(duplicateUser);
            expect(response.status).toBe(409);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('nên đăng nhập thành công và trả về accessToken', async () => {
            const credentials = {
                email: 'integration@gmail.com',
                password: 'Password123!'
            };
            const response = await request(app).post('/api/v1/auth/login').send(credentials);
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('accessToken');
        });

        it('nên trả về lỗi 401 nếu sai mật khẩu', async () => {
            const response = await request(app).post('/api/v1/auth/login').send({
                email: 'integration@gmail.com',
                password: 'WrongPassword!'
            });
            expect(response.status).toBe(401);
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});