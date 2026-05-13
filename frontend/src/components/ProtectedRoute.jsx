import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// CÁNH CỔNG KIỂM SOÁT
export default function ProtectedRoute() {

    // Lấy thông tin user và trạng thái login từ kho chung AuthContext
    const { user, loading } = useAuth();

    // TH1: Đang trong quá trình kiểm tra token (vừa load trang)
    // Đợi cho đến khi việc kiểm tra hoàn tất
    // Nếu không có dòng này, app sẽ tưởng user chưa đăng nhập và đá họ ra ngoài ngay lập tức
    if(loading) 
        return <div className="flex items-center justify-center h-screen">Đang kiểm tra quyền truy cập...</div>;
    
    // TH2: Kiểm tra xong và xác nhận KHÔNG có người dùng (chưa đăng nhập)
    // <Navigate /> sẽ tự động đẩy người dùng về trang /auth (trang đăng nhập).
    // thuộc tính 'replace' giúp thay thế URL hiện tại trong lịch sử trình duyệt,
    // khiến người dùng không thể bấm nút "Back" để quay lại trang bí mật đó nữa.
    if(!user)
        return <Navigate to="/auth" replace />
    
    // TH3: Đã đăng nhập hợp lệ
    // Outlet /> là một "lỗ hổng" hoặc "vị trí đặt chỗ". 
    // Nó sẽ hiển thị các Route con nằm bên trong ProtectedRoute (trong file App.jsx)
    // Ví dụ: Nếu đang vào /dashboard, thì <Outlet /> chính là <Dashboard />.
    return <Outlet />
}