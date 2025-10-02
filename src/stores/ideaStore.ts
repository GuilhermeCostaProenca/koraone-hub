import { create } from 'zustand';
import { Idea, IdeaCreateData, User } from '@/types';

interface IdeaState {
  ideas: Idea[];
  myIdeas: Idea[];
  loading: boolean;
  createIdea: (data: IdeaCreateData, user: User) => Promise<void>;
  fetchIdeas: (mine?: boolean) => Promise<void>;
  likeIdea: (id: string) => Promise<void>;
  getMapIdeas: () => Idea[];
}

const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Clínicas Digitais',
    description: 'Plataforma digital para conectar pacientes e profissionais de saúde, facilitando consultas online e acompanhamento médico.',
    impact: 'Democratizar o acesso à saúde e reduzir custos operacionais em até 40%.',
    author: {
      id: '1',
      name: 'Guilherme Costa',
      email: 'guilherme@koraone.com',
      avatar: 'GC'
    },
    status: 'aprovada',
    likes: 12,
    createdAt: '2024-01-15T10:30:00Z',
    location: {
      lat: -23.5505,
      lng: -46.6333
    }
  },
  {
    id: '2',
    title: 'Mapa de Quebras',
    description: 'Sistema inteligente para mapear e prever falhas em equipamentos industriais usando IoT e machine learning.',
    impact: 'Reduzir tempo de parada não planejada em 60% e custos de manutenção em 30%.',
    author: {
      id: '2',
      name: 'Hugo Oliveira', 
      email: 'hugo@koraone.com',
      avatar: 'HO'
    },
    status: 'em avaliação',
    likes: 7,
    createdAt: '2024-01-20T14:15:00Z',
    location: {
      lat: -23.5489,
      lng: -46.6388
    }
  },
  {
    id: '3',
    title: 'Fila Inteligente',
    description: 'App para otimização de filas em estabelecimentos usando algoritmos de predição e notificações em tempo real.',
    impact: 'Melhorar experiência do cliente e aumentar eficiência operacional em 25%.',
    author: {
      id: '1',
      name: 'Guilherme Costa',
      email: 'guilherme@koraone.com', 
      avatar: 'GC'
    },
    status: 'enviada',
    likes: 3,
    createdAt: '2024-01-25T09:45:00Z'
  }
];

export const useIdeaStore = create<IdeaState>((set, get) => ({
  ideas: mockIdeas,
  myIdeas: [],
  loading: false,

  createIdea: async (data: IdeaCreateData, user: User) => {
    try {
      set({ loading: true });
      
      const newIdea = {
        title: data.title,
        description: data.description,
        impact: data.impact,
        location: data.location,
        author: user
      };
      
      const response = await fetch('/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIdea)
      });
      
      const createdIdea = await response.json();
      
      set(state => ({
        ideas: [createdIdea, ...state.ideas],
        loading: false
      }));
      
      return createdIdea;
    } catch (error) {
      console.error('Error creating idea:', error);
      // Fallback: add locally with generated ID
      const localIdea: Idea = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        impact: data.impact,
        location: data.location,
        author: user,
        status: 'enviada',
        likes: 0,
        createdAt: new Date().toISOString()
      };
      set(state => ({
        ideas: [localIdea, ...state.ideas],
        loading: false
      }));
      return localIdea;
    }
  },

  fetchIdeas: async (mine = false) => {
    try {
      set({ loading: true });
      const response = await fetch('/ideas');
      const data = await response.json();
      
      if (mine) {
        const currentUser = JSON.parse(localStorage.getItem('koraone_user') || localStorage.getItem('demo_user') || '{}');
        const myIdeas = data.filter((idea: Idea) => idea.author.id === currentUser.id);
        set({ ideas: data, myIdeas, loading: false });
      } else {
        set({ ideas: data, loading: false });
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
      // Fallback to mock data
      set({ ideas: mockIdeas, loading: false });
    }
  },

  likeIdea: async (id: string) => {
    try {
      const response = await fetch(`/ideas/${id}/like`, { method: 'POST' });
      const { likes } = await response.json();
      
      const { ideas } = get();
      set({
        ideas: ideas.map(idea => 
          idea.id === id 
            ? { ...idea, likes, isLiked: true }
            : idea
        )
      });
    } catch (error) {
      console.error('Error liking idea:', error);
      // Fallback: increment locally
      const { ideas } = get();
      set({
        ideas: ideas.map(idea => 
          idea.id === id 
            ? { ...idea, likes: (idea.likes || 0) + 1, isLiked: true }
            : idea
        )
      });
    }
  },

  getMapIdeas: () => {
    const { ideas } = get();
    return ideas.filter(idea => idea.location);
  }
}));