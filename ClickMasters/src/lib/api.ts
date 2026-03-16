/**
 * API utility for making requests to the backend
 * Works with both client and server components
 */

const API_BASE_URL = '/api';

export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

/**
 * Enhanced fetch wrapper for API calls
 */
export async function apiFetch<T = any>(
  path: string,
  options?: RequestInit & { baseURL?: string }
): Promise<Response> {
  const url = `${options?.baseURL || API_BASE_URL}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.error("[API Error]", error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function apiGet<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, { ...options, method: "GET" });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * POST request helper
 */
export async function apiPost<T = any>(
  path: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * PUT request helper
 */
export async function apiPut<T = any>(
  path: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = any>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, { ...options, method: "DELETE" });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

/**
 * PATCH request helper
 */
export async function apiPatch<T = any>(
  path: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}
