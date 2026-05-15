import { Server as SocketIOServer } from 'socket.io';

/**
 * Biến lưu trữ instance của Socket.IO Server.
 * Được sử dụng như một Singleton để có thể truy cập từ mọi nơi trong ứng dụng.
 */
let io: SocketIOServer | null = null;

/**
 * Thiết lập instance cho Socket.IO Server.
 * Hàm này nên được gọi ngay sau khi khởi tạo Server trong file chính (thường là index.ts hoặc server.ts).
 * 
 * @param server - Instance của Socket.IO Server
 */
export const setIO = (server: SocketIOServer) => {
    io = server;
}

/**
 * Truy xuất instance của Socket.IO Server.
 * Dùng hàm này khi bạn muốn emit event từ các Controller, Service hoặc Middleware.
 * 
 * @returns Instance của Socket.IO Server
 * @throws Error nếu gọi hàm này trước khi setIO được thực thi
 */
export const getIO = (): SocketIOServer => {
    if(!io){
        throw new Error("Socket.IO chưa được khởi tạo. Đảm bảo setIO đã được gọi.");
    }

    return io;
}

