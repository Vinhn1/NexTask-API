import api from './api';

const projectService = {
  // Lấy danh sách dự án của user
  getUserProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Tạo dự án mới
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Cập nhật dự án
  updateProject: async (projectId, updateData) => {
    const response = await api.patch(`/projects/${projectId}`, updateData);
    return response.data;
  },

  // Xóa dự án
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  // Thêm thành viên vào dự án
  addMember: async (projectId, email) => {
    const response = await api.post(`/projects/${projectId}/members`, { email });
    return response.data;
  },

  // Lấy danh sách thành viên
  getMembers: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/members`);
    return response.data;
  },

  // Xóa thành viên khỏi dự án
  removeMember: async (projectId, memberId) => {
    const response = await api.delete(`/projects/${projectId}/members/${memberId}`);
    return response.data;
  }
};


export default projectService;

