import http from "http";
import app from "./app";
import { initSocket } from "./lib/socket";

// Cấu hình cổng chạy server (mặc định 5000 nếu không có biến môi trường)
const PORT = process.env.PORT || 5000;

/**
 * TẠO HTTP SERVER:
 * Chúng ta bọc Express 'app' vào trong một HTTP Server thuần của Node.js.
 * Điều này cho phép Socket.IO có thể chạy cùng trên một cổng với các API Restful.
 */
const server = http.createServer(app);

/**
 * KHỞI TẠO SOCKET.IO:
 * Gắn logic real-time vào server vừa tạo.
 */
initSocket(server);

/**
 * LẮNG NGHE KẾT NỐI:
 * QUAN TRỌNG: Phải dùng 'server.listen' thay vì 'app.listen'.
 * Nếu dùng 'app.listen', Express sẽ tự tạo một server mới và Socket.IO sẽ không hoạt động được.
 */
server.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
