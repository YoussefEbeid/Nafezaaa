import axios from 'axios';
import { useAuthStore } from './store'; // We will create this next

// 1. Create the instance
const api = axios.create({
  baseURL: 'http://localhost:5195/api', // Must match your .NET Program.cs setup
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (Attach Token)
api.interceptors.request.use((config) => {
  // Read token directly from local storage (bypassing React state for speed)
  // or use the Zustand store state
  const token = localStorage.getItem('nafeza_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // For FormData, remove Content-Type to let browser set it with boundary
  // This is critical - browser must set multipart/form-data with boundary parameter
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
    // Also remove from common headers if present
    if (config.headers.common) {
      delete config.headers.common['Content-Type'];
      delete config.headers.common['content-type'];
    }
  }
  
  return config;
});

// 3. Response Interceptor (Global Error Handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If Backend says "401 Unauthorized", force logout
    if (error.response?.status === 401) {
      localStorage.removeItem('nafeza_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;