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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    const token = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('koraone_token', token);
    localStorage.setItem('koraone_user', JSON.stringify(user));
    
    set({
      user,
      token,
      isAuthenticated: true
    });
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