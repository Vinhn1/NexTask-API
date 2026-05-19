import api from './api';

const attachmentService = {
  // Lấy danh sách tài liệu của task
  getAttachments: (taskId) =>
    api.get(`/tasks/${taskId}/attachments`).then((r) => r.data),

  // Upload tài liệu mới (FormData)
  uploadAttachment: (taskId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/tasks/${taskId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },

  // Proxy download qua backend — tránh CORS và Cloudinary 401
  proxyFile: (taskId, attachmentId, mode = 'download') =>
    api.get(`/tasks/${taskId}/attachments/${attachmentId}/proxy?mode=${mode}`, {
      responseType: 'blob',
    }).then((r) => r.data),

  // Xóa tài liệu
  deleteAttachment: (taskId, attachmentId) =>
    api.delete(`/tasks/${taskId}/attachments/${attachmentId}`).then((r) => r.data),
};

export default attachmentService;

