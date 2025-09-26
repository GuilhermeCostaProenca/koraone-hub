import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

const NO_AUTH = true; // Change to false when backend is ready

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email?: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const DEMO_USER: User = {
  id: "demo",
  name: "Demo User",
  email: "demo@kora.one",
  avatar: "DU"
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email?: string) => {
    if (NO_AUTH) {
      // Demo mode - no network requests
      setUser(DEMO_USER);
      setIsAuthenticated(true);
      localStorage.setItem('demo_auth', 'true');
      localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
    } else {
      // Real authentication flow would go here
      // This is where you'd integrate with your backend
      throw new Error('Real authentication not implemented yet');
    }
  };

  const logout = () => {
    if (NO_AUTH) {
      localStorage.removeItem('demo_auth');
      localStorage.removeItem('demo_user');
    } else {
      // Real logout flow would go here
    }
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const initialize = () => {
    if (NO_AUTH) {
      // Check for demo auth in localStorage
      const demoAuth = localStorage.getItem('demo_auth');
      const demoUser = localStorage.getItem('demo_user');
      
      if (demoAuth === 'true' && demoUser) {
        try {
          const parsedUser = JSON.parse(demoUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing demo user:', error);
          // Clear invalid data
          localStorage.removeItem('demo_auth');
          localStorage.removeItem('demo_user');
        }
      } else {
        // In NO_AUTH mode, automatically authenticate as demo user
        setUser(DEMO_USER);
        setIsAuthenticated(true);
        localStorage.setItem('demo_auth', 'true');
        localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
      }
    } else {
      // Real initialization flow would go here
      // Check for real auth tokens, validate with backend, etc.
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      initialize
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}