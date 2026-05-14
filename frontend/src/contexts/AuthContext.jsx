// Quản lý user + token
import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

// TẠO CÁI "HỘP CHỨA" (CONTEXT)
// AuthContext là 1 cái thùng chứa thông tin đăng nhập mà ai cũng có thể thò tay vào lấy
const AuthContext = createContext();

// TẠO "NGƯỜI QUẢN LÝ" (PROVIDER)
// Component này sẽ bao bọc toàn bộ ứng dụng để cung cấp dữ liệu cho các con
export function AuthProvider({ children }){

    // Tạo biến 'user' để lưu thông tin người dùng (tên, email...). Mặc định là chưa có ai (null).
    const [user, setUser] = useState(null);

    // Tạo biến 'loading' để biết ứng dụng đang trong quá trình kiểm tra đăng nhập hay chưa.
    // Mới vào trang web thì phải là true (đang load)
    const [loading, setLoading] = useState(true);

    // KIỂM TRA ĐĂNG NHẬP KHI VỪA MỞ TRANG
    useEffect(() => {

        // Thử lấy "chìa khóa" (token) đã lưu trong trình duyệt từ lần trước
        const token = localStorage.getItem('accessToken');

        if(token){
            // Nếu có chìa khóa, gửi lên server để hỏi: "Chìa khóa này là của ai?"
            axios.get('/api/v1/auth/me', {
                headers: {
                    // Gửi kèm token trong header theo chuẩn
                    Authorization: `Bearer ${token}`
                }
            })
            .then(
                // Server trả lời đúng -> Lưu thông tin người dùng vào biến 'user'
                res => setUser(res.data.data.user)
            )
            // Nếu chìa khóa giả hoặc hết hạn -> Xóa chìa khóa đi
            .catch(() => localStorage.removeItem('accessToken'))
            // Dù thành công hay thất bại cũng kết thúc việc "load"
            .finally(() => setLoading(false));
        }else{
            // Không có chìa khóa thì không cần load nữa, người dùng chưa đăng nhập
            setLoading(false);
        }
    }, []); // Mảng [] để chỉ chạy 1 lần duy nhất khi F5 trang web

    // HÀM ĐĂNG NHẬP
    const login = async (email, password) => {
        try {
            // Gửi email và pass lên Server
            const res = await axios.post('/api/v1/auth/login', { email, password });
            // Server gửi về 1 cái chìa khóa mới (token) -> Lưu vào bộ nhớ trình duyệt
            localStorage.setItem('accessToken', res.data.data.accessToken);
            // Lưu thông tin người dùng vào 'user' để hiển thị lên giao diện (VD: chào bạn A)
            setUser(res.data.data.user);
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || error.message);
            throw error; // Quăng lỗi ra để UI xử lý (hiển thị thông báo cho user)
        }
    }

    // HÀM ĐĂNG KÝ
    const register = async (fullname, email, password) => {
        try {
            const res = await axios.post('/api/v1/auth/register', { fullname, email, password });
            // Sau khi đăng ký thành công, thường Server sẽ trả về token luôn để login tự động
            if (res.data.data.accessToken) {
                localStorage.setItem('accessToken', res.data.data.accessToken);
                setUser(res.data.data.user);
            }
            return res.data;
        } catch (error) {
            console.error("Register Error:", error.response?.data?.message || error.message);
            throw error;
        }
    }

    // HÀM ĐĂNG XUẤT
    const logout = () => {
        // Xóa chìa khóa trong bộ nhớ
        localStorage.removeItem('accessToken');
        // Đưa user về trạng thái trống (null) -> Giao diện sẽ tự chuyển về nút "Đăng nhập"
        setUser(null);
    }


    // Trả về: Cung cấp tất cả dữ liệu (user, loading, login, register, logout) cho toàn bộ ứng dụng
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {/* 'children' chính là toàn bộ các component con của ứng dụng */}
            {children}
        </AuthContext.Provider>
    )

}

// TẠO LỐI TẮT ĐỀ LẤY DỮ LIỆU (CUSTOM HOOK)
//  Thay vì mỗi lần dùng phải import 2 thứ, tạo ra hàm useAuth() dùng cho gọn
export const useAuth = () => {
    return useContext(AuthContext);
} 

