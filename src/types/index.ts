export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  impact: string;
  author: User;
  status: 'enviada' | 'em avaliação' | 'aprovada';
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  media?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export interface IdeaCreateData {
  title: string;
  description: string;
  impact: string;
  media?: File;
  location?: {
    lat: number;
    lng: number;
  };
}

export type IdeaStatus = 'enviada' | 'em avaliação' | 'aprovada';

export interface KPIData {
  sent: number;
  approved: number;
  totalLikes: number;
}