import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Đợi kiểm tra token xong trước khi quyết định redirect
    if (loading)
        return <div className="flex items-center justify-center h-screen">Đang kiểm tra quyền truy cập...</div>;

    // Chưa đăng nhập → về trang Home (không phải /auth để logout hoạt động đúng)
    if (!user)
        return <Navigate to="/" state={{ from: location }} replace />;

    // Đã đăng nhập → render route con
    return <Outlet />;
}
