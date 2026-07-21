/**
 * ============================================================
 * REST API Endpoints
 * ============================================================
 */

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },

  products: "/products",
  categories: "/categories",
  units: "/units",
  suppliers: "/suppliers",
  customers: "/customers",
  users: "/users",

  sales: "/sales",
  purchases: "/purchases",
  invoices: "/invoices",

  inventory: "/inventory",
  stockMovements: "/stock-movements",

  dashboard: "/dashboard",
  analytics: "/analytics",
} as const;
