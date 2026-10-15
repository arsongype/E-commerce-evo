import axiosInstance from './axios.config'

export const productAPI = {
  getAll: (params = {}) =>
    axiosInstance.get('/products', { params }),

  getById: (id) =>
    axiosInstance.get(`/products/${id}`),

  getBySlug: (slug) =>
    axiosInstance.get(`/products/slug/${slug}`),

  getFeatured: () =>
    axiosInstance.get('/products/featured'),

  getNewArrivals: () =>
    axiosInstance.get('/products/new-arrivals'),

  getRelated: (productId) =>
    axiosInstance.get(`/products/${productId}/related`),

  search: (query) =>
    axiosInstance.get('/products/search', { params: { q: query } }),

  getCategories: () =>
    axiosInstance.get('/categories'),

  create: (productData) =>
    axiosInstance.post('/products', productData),

  update: (id, productData) =>
    axiosInstance.put(`/products/${id}`, productData),

  delete: (id) =>
    axiosInstance.delete(`/products/${id}`),

  uploadImage: (id, formData) =>
    axiosInstance.post(`/products/${id}/images`, formData),

  addReview: (productId, reviewData) =>
    axiosInstance.post(`/products/${productId}/reviews`, reviewData),

  getReviews: (productId, params = {}) =>
    axiosInstance.get(`/products/${productId}/reviews`, { params }),
}
