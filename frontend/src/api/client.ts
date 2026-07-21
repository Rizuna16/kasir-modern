import { API_CONFIG } from "./config";
import { tokenStorage } from "./auth";
import type { ApiResponse, RequestOptions } from "./types";

function buildUrl(endpoint: string, query?: RequestOptions["query"]) {
  const url = new URL(API_CONFIG.baseURL + endpoint);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const controller = new AbortController();

  const timeout = window.setTimeout(
    () => controller.abort(),
    options.timeout ?? API_CONFIG.timeout,
  );

  try {
    const response = await fetch(buildUrl(endpoint, options.query), {
      method: options.method ?? "GET",

      headers: {
        ...API_CONFIG.headers,
        ...(tokenStorage.get()
          ? {
              Authorization: `Bearer ${tokenStorage.get()}`,
            }
          : {}),
        ...options.headers,
      },

      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,

      signal: controller.signal,
    });

    const json = await response.json();

    if (!response.ok) {
      throw json;
    }

    return json;
  } finally {
    clearTimeout(timeout);
  }
}

export const apiClient = {
  get<T>(url: string, query?: RequestOptions["query"]) {
    return request<T>(url, {
      method: "GET",
      query,
    });
  },

  post<T>(url: string, body?: unknown) {
    return request<T>(url, {
      method: "POST",
      body,
    });
  },

  put<T>(url: string, body?: unknown) {
    return request<T>(url, {
      method: "PUT",
      body,
    });
  },

  patch<T>(url: string, body?: unknown) {
    return request<T>(url, {
      method: "PATCH",
      body,
    });
  },

  delete<T>(url: string) {
    return request<T>(url, {
      method: "DELETE",
    });
  },
};
