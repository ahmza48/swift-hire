import axios from 'axios';

/**
 * All admin API calls hit the Next.js host at /api/admin/*.
 * The Vite dev server (port 5174) proxies the same prefix to :3000 so this
 * one baseURL works in both dev and production without a build-time env var.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request when available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
