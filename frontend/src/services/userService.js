import api from './api';

const userService = {
  updateProfile: async (profileData) => {
    const response = await api.patch('/users/me', profileData);
    return response.data;
  },

  updateAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.patch('/users/update-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export default userService;
