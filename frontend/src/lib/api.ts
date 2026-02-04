export const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  return fetch(url, options);
}
