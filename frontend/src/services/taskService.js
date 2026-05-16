import api from './api';

const taskService = {
  // Lấy danh sách task của project
  getProjectTasks: async (projectId, filters = {}) => {
    const response = await api.get(`/tasks/${projectId}`, { params: filters });
    return response.data;
  },

  // Tạo task mới
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Cập nhật task
  updateTask: async (taskId, updateData) => {
    const response = await api.patch(`/tasks/${taskId}`, updateData);
    return response.data;
  },

  // Xóa task
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  // Lấy thống kê (client tự tính từ dữ liệu task)
  // Backend trả về: { status, data: [...tasks], pagination }
  getTaskStats: async (projectId) => {
    const response = await api.get(`/tasks/${projectId}`);
    const tasks = response.data.data || [];   // data là array tasks trực tiếp

    return {
      total: tasks.length,
      done: tasks.filter(t => t.status === 'DONE').length,
      inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      review: tasks.filter(t => t.status === 'REVIEW').length,
      todo: tasks.filter(t => t.status === 'TODO').length,
    };
  }
};

export default taskService;
