import { create } from 'zustand';
import { AuthState, User } from '@/types';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Guilherme Costa',
    email: 'guilherme@koraone.com',
    avatar: 'GC'
  },
  {
    id: '2', 
    name: 'Hugo Oliveira',
    email: 'hugo@koraone.com',
    avatar: 'HO'
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string) => {
    try {
      // Try login first
      const loginResponse = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      let data;
      if (loginResponse.ok) {
        data = await loginResponse.json();
      } else {
        // If login fails, try register
        const registerResponse = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        data = await registerResponse.json();
      }

      localStorage.setItem('koraone_token', data.token);
      localStorage.setItem('koraone_user', JSON.stringify(data.user));
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Login/Register error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('koraone_token');
    localStorage.removeItem('koraone_user');
    
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  initialize: () => {
    const token = localStorage.getItem('koraone_token');
    const userStr = localStorage.getItem('koraone_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          token,
          isAuthenticated: true
        });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('koraone_token');
        localStorage.removeItem('koraone_user');
      }
    }
  }
}));