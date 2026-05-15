import api from './api';

const commentService = {
  // Lấy danh sách comment của task
  getTaskComments: async (taskId) => {
    const response = await api.get(`/comments/${taskId}`);
    return response.data;
  },

  // Tạo comment mới
  createComment: async (taskId, content) => {
    const response = await api.post('/comments', { taskId, content });
    return response.data;
  },

  // Xóa comment
  deleteComment: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  }
};

export default commentService;
