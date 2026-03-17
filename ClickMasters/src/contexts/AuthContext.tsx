'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '@/lib/api';

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFetch('/api/users/me', { credentials: 'include' });
        
        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUser(userData);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData);
        return true;
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await apiFetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};