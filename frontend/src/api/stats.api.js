import axiosInstance from './axios.config'

export const statsAPI = {
  getDashboardStats: () =>
    axiosInstance.get('/admin/stats/dashboard'),
}
