import axiosInstance from './axios.config'

export const userAPI = {
  getAll: (params = {}) =>
    axiosInstance.get('/admin/users', { params }),

  getById: (id) =>
    axiosInstance.get(`/admin/users/${id}`),

  update: (id, userData) =>
    axiosInstance.put(`/admin/users/${id}`, userData),

  delete: (id) =>
    axiosInstance.delete(`/admin/users/${id}`),
}
