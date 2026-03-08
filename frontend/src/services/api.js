import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

export const resourceAPI = {
  getAll: (params) => api.get('/resources', { params }),
  add: (resourceData) => api.post('/resources', resourceData),
  update: (id, resourceData) => api.put(`/resources/${id}`, resourceData),
  delete: (id) => api.delete(`/resources/${id}`),
  changeStatus: (id, status) => api.put(`/resources/${id}/status`, { status }),
  getCategories: () => api.get('/resources/categories'),
  addCategory: (categoryData) => api.post('/resources/categories', categoryData),
};

export const borrowAPI = {
  createRequest: (requestData) => api.post('/borrow', requestData),
  getMyRequests: () => api.get('/borrow/my'),
  getAllRequests: (params) => api.get('/borrow/all', { params }),
  approveRequest: (id) => api.put(`/borrow/${id}/approve`),
  rejectRequest: (id, reason) => api.put(`/borrow/${id}/reject`, { rejectionReason: reason }),
  markAsBorrowed: (id) => api.put(`/borrow/${id}/borrowed`),
  markAsReturned: (id, notes) => api.put(`/borrow/${id}/return`, { notes }),
};

export const reportAPI = {
  getDashboard: () => api.get('/reports/dashboard'),
  getBorrowHistory: (params) => api.get('/reports/borrow-history', { params }),
  getResourceUtilization: () => api.get('/reports/resource-utilization'),
  getUserActivity: (params) => api.get('/reports/user-activity', { params }),
};

export default api;
