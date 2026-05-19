/* eslint-disable react-refresh/only-export-components */
// Quản lý user + token
import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useNavigate hoạt động được vì BrowserRouter đã bọc AuthProvider trong App.jsx
    const navigate = useNavigate();

    // KIỂM TRA ĐĂNG NHẬP KHI VỪA MỞ TRANG
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if(token){
            api.get('/auth/me')
            .then(res => setUser(res.data.data.user))
            .catch(() => localStorage.removeItem('accessToken'))
            .finally(() => setLoading(false));
        }else{
            const timeoutId = window.setTimeout(() => setLoading(false), 0);
            return () => window.clearTimeout(timeoutId);
        }
    }, []);

    // HÀM ĐĂNG NHẬP
    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            setUser(res.data.data.user);
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || error.message);
            throw error;
        }
    }

    // HÀM ĐĂNG KÝ
    const register = async (fullname, email, password) => {
        try {
            const res = await api.post('/auth/register', { fullname, email, password });
            if (res.data.data.accessToken) {
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                setUser(res.data.data.user);
            }
            return res.data;
        } catch (error) {
            console.error("Register Error:", error.response?.data?.message || error.message);
            throw error;
        }
    }

    const updateUser = (nextUser) => {
        setUser(prev => ({ ...(prev || {}), ...(nextUser || {}) }));
    }

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    }, []);

    // Lắng nghe sự kiện 401 từ api.js, dùng useNavigate để không phá vỡ React Router
    useEffect(() => {
        const handleUnauthorized = () => {
            logout();
            // Dùng React Router navigate thay vì window.location để giữ nguyên SPA
            navigate('/auth', { replace: true });
        };
        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, [logout, navigate]);

    const loginWithTokens = useCallback(async (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.data.user);
        } catch (error) {
            console.error("Token Login Error:", error);
            logout();
            throw error;
        }
    }, [logout]);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, loginWithTokens }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
