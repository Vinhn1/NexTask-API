// react-router-dom: thư viện tạo ra ứng dụng SPA (Single Page Application)
// Giúp trang web chuyển cảnh mượt mà mà không cần tải lại trang (F5)
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthPage } from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'
import { ResetPassword } from './pages/ResetPassword';
import HomePage from './pages/home/HomePage';

function App() {

  return (
    <AuthProvider>
      {/* BrowserRouter: Thành phần bao bọc bên ngoài để kích hoạt khả năng điều hướng bằng URL trên trình duyệt. */}
      <BrowserRouter>

      {/* Routes: Một cái "thùng chứa" tất cả các con đường (Routes) có trong app. */}
      <Routes>
        {/* Route: Định nghĩa một con đường cụ thể. Ví dụ: "Nếu URL là /auth thì hiện trang AuthPage". */}
        {/* Đăng ký, Đăng nhập -> Public */}
        <Route path='/auth' element={<AuthPage />} />

        {/* Reset Pass */}
        <Route path='/resetpass' element={<ResetPassword/>} />

        {/* Dashboard -> Private */}
        <Route element={<ProtectedRoute />}>
           <Route path="/dashboard" element={<Dashboard />}/>
            {/* Các Route Khác */}
        </Route>
       
       {/* Navigate: Dùng để tự động chuyển hướng người dùng (ví dụ: đang ở / thì tự nhảy sang /dashboard). */}
       <Route path="/" element={<HomePage />} />
   
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
