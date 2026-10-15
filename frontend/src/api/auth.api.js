import axiosInstance from './axios.config'

export const authAPI = {
  login: (credentials) =>
    axiosInstance.post('/auth/login', credentials),

  register: (userData) =>
    axiosInstance.post('/auth/register', userData),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  refreshToken: (refreshToken) =>
    axiosInstance.post('/auth/refresh-token', { refreshToken }),

  forgotPassword: (email) =>
    axiosInstance.post('/auth/forgot-password', { email }),

  resetPassword: (token, newPassword) =>
    axiosInstance.post('/auth/reset-password', { token, newPassword }),

  getCurrentUser: () =>
    axiosInstance.get('/auth/me'),

  updateProfile: (profileData) =>
    axiosInstance.put('/auth/profile', profileData),
}
