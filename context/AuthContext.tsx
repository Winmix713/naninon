import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { safeLocalStorage } from '../utils/localStorageUtils';
import { LOGGED_IN_USER_KEY } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = safeLocalStorage('get', LOGGED_IN_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock authentication logic
    if (email === 'takosadam@gmail.com' && password === 'takosadam') {
      const userData = { email, username: 'takosadam' };
      setUser(userData);
      safeLocalStorage('set', LOGGED_IN_USER_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(LOGGED_IN_USER_KEY);
    } catch (error) {
      console.error('Failed to remove user from localStorage', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};