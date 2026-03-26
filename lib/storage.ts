/**
 * Storage utility for client-side operations
 * Safe to use in browser only
 */

export const storage = {
  getItem: (key: string): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },

  setItem: (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },

  removeItem: (key: string): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

// Types
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

export interface Admin {
  email: string;
  passwordHash: string;
}
