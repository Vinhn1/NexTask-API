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
            const newSocket = io('http://localhost:3000', {
                auth: {
                    token
                },
                transports: ['websocket'] // Force websocket for better performance if server supports it
            });

            newSocket.on('connect', () => {
                console.log('✅ Socket connected:', newSocket.id);
            });

            newSocket.on('connect_error', (error) => {
                console.error('❌ Socket connection error:', error.message);
            });

            setSocket(newSocket);

            return () => {
                console.log('🔌 Disconnecting socket...');
                newSocket.disconnect();
            };
        } else {
            // Nếu không có user (đăng xuất), đảm bảo socket bị ngắt và reset state
            setSocket(null);
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


export const useSocket = () => useContext(SocketContext);