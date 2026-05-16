/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            // Lấy token 
            const token = localStorage.getItem('accessToken');
            
            // Khởi tạo kết nối 
            const socketUrl =
                import.meta.env.VITE_SOCKET_URL ||
                import.meta.env.VITE_API_TARGET ||
                window.location.origin;
            const newSocket = io(socketUrl, {
                auth: {
                    token
                },
                // Để Socket.IO tự negotiate: polling trước, rồi upgrade lên websocket
                // Tránh lỗi kết nối khi Vite proxy chưa sẵn sàng
                transports: ['polling', 'websocket'],
            });

            newSocket.on('connect', () => {
                console.log('✅ Socket connected:', newSocket.id);
            });

            newSocket.on('connect_error', (error) => {
                console.error('❌ Socket connection error:', error.message);
            });

            const timeoutId = window.setTimeout(() => setSocket(newSocket), 0);

            return () => {
                window.clearTimeout(timeoutId);
                console.log('🔌 Disconnecting socket...');
                newSocket.disconnect();
            };
        } else {
            // Nếu không có user (đăng xuất), đảm bảo socket bị ngắt và reset state
            const timeoutId = window.setTimeout(() => setSocket(null), 0);
            return () => window.clearTimeout(timeoutId);
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => useContext(SocketContext);
