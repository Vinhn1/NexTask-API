import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động chèn token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý lỗi tập trung (ví dụ: token hết hạn)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logout hoặc xử lý refresh token ở đây nếu cần
      localStorage.removeItem('accessToken');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
