import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Tự động chèn token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bỏ qua lỗi mạng (backend offline) - không logout
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      // Chỉ bắn event, KHÔNG tự clear token ở đây
      // AuthContext sẽ gọi logout() để clear token và navigate về /auth
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    return Promise.reject(error);
  }
);

export default api;
