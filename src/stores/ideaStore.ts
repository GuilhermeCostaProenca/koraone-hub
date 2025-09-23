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
    set({ loading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newIdea: Idea = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      impact: data.impact,
      location: data.location,
      media: data.media ? URL.createObjectURL(data.media) : undefined,
      author: user,
      status: 'enviada',
      likes: 0,
      createdAt: new Date().toISOString()
    };
    
    set(state => ({
      ideas: [newIdea, ...state.ideas],
      loading: false
    }));
  },

  fetchIdeas: async (mine = false) => {
    set({ loading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { ideas } = get();
    
    if (mine) {
      const currentUser = JSON.parse(localStorage.getItem('koraone_user') || '{}');
      const myIdeas = ideas.filter(idea => idea.author.id === currentUser.id);
      set({ myIdeas, loading: false });
    } else {
      set({ loading: false });
    }
  },

  likeIdea: async (id: string) => {
    const { ideas } = get();
    
    set({
      ideas: ideas.map(idea => 
        idea.id === id 
          ? { ...idea, likes: idea.likes + 1, isLiked: true }
          : idea
      )
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  },

  getMapIdeas: () => {
    const { ideas } = get();
    return ideas.filter(idea => idea.location);
  }
}));