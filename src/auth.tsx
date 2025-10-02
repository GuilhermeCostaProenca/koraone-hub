import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

const NO_AUTH = true; // Change to false when backend is ready

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email?: string) => {
    if (NO_AUTH) {
      setUser(DEMO_USER);
      setIsAuthenticated(true);
      localStorage.setItem('demo_auth', 'true');
      localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
      localStorage.setItem('koraone_user', JSON.stringify(DEMO_USER));
    } else {
      throw new Error('Real authentication not implemented yet');
    }
  };

  const logout = () => {
    if (NO_AUTH) {
      localStorage.removeItem('demo_auth');
      localStorage.removeItem('demo_user');
      localStorage.removeItem('koraone_user');
    } else {
      // Real logout flow would go here
    }
    
    setUser(null);
    setIsAuthenticated(false);
  };

  const initialize = () => {
    console.log('🔄 [AUTH] Initialize started');
    
    // ETAPA 2: Timeout de segurança - garante que isLoading sempre vira false
    const safetyTimeout = setTimeout(() => {
      console.log('⏰ [AUTH] Safety timeout triggered - forcing isLoading=false');
      setIsLoading(false);
    }, 2000);
    
    try {
      if (NO_AUTH) {
        const demoAuth = localStorage.getItem('demo_auth');
        const demoUser = localStorage.getItem('demo_user');
        
        if (demoAuth === 'true' && demoUser) {
          try {
            const parsedUser = JSON.parse(demoUser);
            console.log('✅ [AUTH] User loaded from localStorage');
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('❌ [AUTH] Error parsing user:', error);
            localStorage.removeItem('demo_auth');
            localStorage.removeItem('demo_user');
          }
        } else {
          console.log('🆕 [AUTH] Auto-authenticating demo user');
          setUser(DEMO_USER);
          setIsAuthenticated(true);
          localStorage.setItem('demo_auth', 'true');
          localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
          localStorage.setItem('koraone_user', JSON.stringify(DEMO_USER));
        }
      }
      
      clearTimeout(safetyTimeout);
      setIsLoading(false);
      console.log('✅ [AUTH] Initialize completed successfully');
    } catch (error) {
      console.error('❌ [AUTH] Initialize error:', error);
      clearTimeout(safetyTimeout);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    console.log('⏳ [AUTH] Rendering loading screen...');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-foreground text-lg font-semibold">Carregando...</p>
          <p className="text-muted-foreground text-sm mt-2">Inicializando aplicação</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
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