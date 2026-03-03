// API Service Layer - Centralized API calls with error handling
import { API_ENDPOINTS } from "@/config/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  try {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      // Handle empty or non-JSON responses
      if (response.ok) return {};
      throw new Error("Invalid response format");
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
          throw new Error("Session expired. Please login again.");
        case 403:
          throw new Error("Access denied");
        case 404:
          throw new Error("Resource not found");
        case 500:
          throw new Error("Server error. Please try again later.");
        default:
          throw new Error(data.message || "An error occurred");
      }
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Handle empty responses
      return {};
    }
    throw error;
  }
};

// Auth API
export const authApi = {
  login: async (credentials) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },
};

// Products API
export const productsApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString 
      ? `${API_ENDPOINTS.PRODUCTS}?${queryString}` 
      : API_ENDPOINTS.PRODUCTS;
    
    const response = await fetch(url);
    const data = await handleResponse(response);
    
    // Handle both old format (array) and new format (object with products)
    if (Array.isArray(data)) {
      return { products: data, pagination: null };
    }
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
    return handleResponse(response);
  },

  create: async (formData) => {
    const response = await fetch(API_ENDPOINTS.PRODUCTS, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, formData) => {
    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Sales API
export const salesApi = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString 
      ? `${API_ENDPOINTS.SALES}?${queryString}` 
      : API_ENDPOINTS.SALES;
      
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    
    // Handle both old format (array) and new format (object with sales)
    if (Array.isArray(data)) {
      return { sales: data, pagination: null };
    }
    return data;
  },

  create: async (orderData) => {
    const response = await fetch(API_ENDPOINTS.SALES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },
};

// Admin API
export const adminApi = {
  getStats: async () => {
    const response = await fetch(API_ENDPOINTS.ADMIN_STATS, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
