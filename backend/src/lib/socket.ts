import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { setIO } from './io';

/**
 * Khởi tạo Socket.IO Server và thiết lập các logic kết nối.
 * @param httpServer - Instance của HTTP Server (từ Express)
 */
export const initSocket = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Trong thực tế nên giới hạn domain của frontend
            methods: ["GET", "POST"],
        },
    });

    /**
     * Middleware xác thực: Kiểm tra JWT Token trước khi cho phép kết nối.
     */
    io.use(async (socket, next) => {
        try {
            // Lấy token từ handshake auth hoặc query string
            const token = socket.handshake.auth.token || socket.handshake.query.token;
            
            if (!token) {
                return next(new Error("Vui lòng cung cấp token xác thực"));
            }

            // Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as string) as any;
            
            // Kiểm tra người dùng có thực sự tồn tại trong Database không
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.userId
                }
            });

            if (!user) {
                return next(new Error("Người dùng không tồn tại hoặc đã bị xóa"));
            }

            // Lưu thông tin người dùng vào socket instance để sử dụng ở các sự kiện bên dưới
            socket.data.userId = user.id;
            socket.data.user = user;

            next(); // Cho phép kết nối
        } catch (err) {
            next(new Error("Token không hợp lệ hoặc đã hết hạn"));
        }
    });

    /**
     * Xử lý sau khi kết nối thành công.
     */
    io.on("connection", async (socket) => {
        const userId = socket.data.userId;

        console.log(`User connected: ${userId}`);

        // 1. Tham gia vào room cá nhân để nhận thông báo riêng
        socket.join(`user:${userId}`);

        // 2. Tự động tham gia vào tất cả các rooms của dự án mà user là thành viên/chủ sở hữu
        try {
            const projects = await prisma.project.findMany({
                where: {
                    OR: [
                        { ownerId: userId },
                        { 
                            members: { // Sửa từ 'member' thành 'members'
                                some: { id: userId } 
                            } 
                        },
                    ],
                },
                select: { id: true },
            });

            projects.forEach((p) => {
                socket.join(`project:${p.id}`);
                console.log(`User ${userId} joined room project:${p.id}`);
            });
        } catch (err) {
            console.error("Lỗi khi tự động join project rooms: ", err);
        }

        /**
         * Sự kiện join:project: Khi client muốn tham gia vào một dự án mới (ví dụ vừa tạo xong).
         * Chúng ta kiểm tra quyền một lần nữa trước khi cho join.
         */
        socket.on("join:project", async (projectId: string) => {
            const project = await prisma.project.findFirst({
                where: {
                    id: projectId,
                    OR: [
                        { ownerId: userId },
                        {
                            members: {
                                some: { id: userId }
                            }
                        },
                    ],
                },
            });

            if (project) {
                socket.join(`project:${projectId}`);
                console.log(`User ${userId} manually joined room project:${projectId}`);
            }
        });

        // Xử lý khi ngắt kết nối
        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected`);
        });
    });

    // Lưu instance vào lib/io.ts để các nơi khác có thể sử dụng (getIO)
    setIO(io);
    
    return io;
}
