// API Configuration - Centralized API URL management
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,

  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,

  // Sales
  SALES: `${API_BASE_URL}/api/sales`,

  // Admin
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
};

export default API_BASE_URL;
