import { create } from 'axios'

export const api = create({
  baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quick.token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
