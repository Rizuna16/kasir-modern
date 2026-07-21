/**
 * ============================================================
 * API Types
 * ============================================================
 */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  lastPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: unknown;
}
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}
