/**
 * Core application types
 */

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Project {
  _id?: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: string | Category;
  tags: string[];
  status: 'live' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}
