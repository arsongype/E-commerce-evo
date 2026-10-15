import axiosInstance from './axios.config'

export const orderAPI = {
  create: (orderData) =>
    axiosInstance.post('/orders', orderData),

  createOrder: (orderData) => orderAPI.create(orderData),

  getOrders: (params = {}) =>
    axiosInstance.get('/orders', { params }),

  getAll: (params = {}) => orderAPI.getOrders(params),

  getOrderById: (id) =>
    axiosInstance.get(`/orders/${id}`),

  getById: (id) => orderAPI.getOrderById(id),

  getOrderByNumber: (orderNumber) =>
    axiosInstance.get(`/orders/number/${orderNumber}`),

  cancelOrder: (id) => axiosInstance.put(`/orders/${id}/cancel`),

  getAllOrders: (params = {}) =>
    axiosInstance.get('/admin/orders', { params }),

  updateOrderStatus: (id, status) =>
    axiosInstance.put(`/admin/orders/${id}/status`, { status }),
}
