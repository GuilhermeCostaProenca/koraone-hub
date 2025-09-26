import { http, HttpResponse } from 'msw';

// Static database - persistent data that never changes
const staticDb = {
  users: [
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
  ],
  ideas: [
    {
      id: '1',
      title: 'Hub de Inovação Digital',
      description: 'Criar um espaço físico e virtual dedicado ao desenvolvimento de soluções digitais inovadoras.',
      author: { id: '1', name: 'Guilherme Costa', email: 'guilherme@koraone.com', avatar: 'GC' },
      status: 'aprovada' as const,
      impact: 'Aumentar a colaboração entre equipes em 40% e acelerar o time-to-market de produtos digitais.',
      likes: 12,
      createdAt: '2024-01-15T00:00:00.000Z',
      lat: -23.5505,
      lng: -46.6333
    },
    {
      id: '2',
      title: 'Programa de Mentoria Tech',
      description: 'Conectar profissionais experientes com talentos emergentes para acelerar o desenvolvimento técnico.',
      author: { id: '2', name: 'Hugo Oliveira', email: 'hugo@koraone.com', avatar: 'HO' },
      status: 'em avaliação' as const,
      impact: 'Reduzir turnover em 25% e aumentar satisfação dos colaboradores juniores.',
      likes: 8,
      createdAt: '2024-01-20T00:00:00.000Z',
      lat: -23.5489,
      lng: -46.6388
    },
    {
      id: '3',
      title: 'Laboratório de IA Aplicada',
      description: 'Implementar um laboratório para experimentação com inteligência artificial em processos corporativos.',
      author: { id: '1', name: 'Guilherme Costa', email: 'guilherme@koraone.com', avatar: 'GC' },
      status: 'enviada' as const,
      impact: 'Automatizar 30% dos processos manuais e gerar insights preditivos para tomada de decisões.',
      likes: 15,
      createdAt: '2024-01-25T00:00:00.000Z'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Hub de Inovação Digital',
      owner: 'Guilherme Costa',
      status: 'ATIVO' as const,
      economy: 150000,
      impacted: 200,
      startedAt: '2024-02-01T00:00:00.000Z',
      description: 'Projeto piloto para implementação do hub de inovação digital na empresa.'
    },
    {
      id: '2',
      title: 'Sistema de Gestão Inteligente',
      owner: 'Hugo Oliveira',
      status: 'PILOTO' as const,
      economy: 80000,
      impacted: 50,
      startedAt: '2024-03-01T00:00:00.000Z',
      description: 'Piloto para teste do novo sistema de gestão com IA.'
    }
  ],
  insights: [
    {
      id: '1',
      title: 'Workshops Colaborativos',
      description: 'Organize sessões de brainstorming em grupo para estimular a criatividade e gerar ideias inovadoras.',
      category: 'Colaboração',
      icon: 'Users'
    },
    {
      id: '2',
      title: 'Boletim de Impacto',
      description: 'Crie relatórios mensais destacando as ideias implementadas e seus resultados.',
      category: 'Comunicação',
      icon: 'TrendingUp'
    },
    {
      id: '3',
      title: 'Gamificação de Ideias',
      description: 'Implemente um sistema de pontos e badges para engajar colaboradores.',
      category: 'Engajamento',
      icon: 'Sparkles'
    }
  ]
};

// Store for runtime data (initialized from static database)
let runtimeUsers = [...staticDb.users];
let runtimeIdeas = [...staticDb.ideas];
let runtimeProjects = [...staticDb.projects];
let currentInsights = [...staticDb.insights];

export const handlers = [
  // Auth endpoints - Accept any email
  http.post('/auth/login', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    let user = runtimeUsers.find(u => u.email === email);
    
    // Create user for ANY email if not found
    if (!user) {
      const name = email.split('@')[0].split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      user = {
        id: String(runtimeUsers.length + 1),
        name,
        email,
        avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      };
      
      runtimeUsers.push(user);
    }
    
    return HttpResponse.json({
      user,
      token: `mock-token-${Date.now()}`
    });
  }),

  http.post('/auth/register', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    let user = runtimeUsers.find(u => u.email === email);
    
    // Create user for ANY email if not found
    if (!user) {
      const name = email.split('@')[0].split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
      
      user = {
        id: String(runtimeUsers.length + 1),
        name,
        email,
        avatar: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      };
      
      runtimeUsers.push(user);
    }
    
    return HttpResponse.json({
      user,
      token: `mock-token-${Date.now()}`
    });
  }),

  // Ideas endpoints
  http.get('/ideas', () => {
    return HttpResponse.json(runtimeIdeas);
  }),

  http.get('/ideas/map', () => {
    const mapIdeas = runtimeIdeas.filter(idea => idea.lat && idea.lng).map(idea => ({
      id: idea.id,
      title: idea.title,
      status: idea.status,
      lat: idea.lat,
      lng: idea.lng,
      author: idea.author
    }));
    return HttpResponse.json(mapIdeas);
  }),

  http.post('/ideas', async ({ request }) => {
    const ideaData = await request.json() as any;
    const newIdea = {
      id: String(runtimeIdeas.length + 1),
      ...ideaData,
      status: 'enviada' as const,
      likes: 0,
      createdAt: new Date().toISOString()
    };
    
    runtimeIdeas.unshift(newIdea);
    return HttpResponse.json(newIdea);
  }),

  http.post('/ideas/:id/like', ({ params }) => {
    const ideaId = params.id as string;
    const idea = runtimeIdeas.find(i => i.id === ideaId);
    
    if (idea) {
      idea.likes += 1;
      return HttpResponse.json({ likes: idea.likes });
    }
    
    return HttpResponse.json({ error: 'Idea not found' }, { status: 404 });
  }),

  // Projects endpoints
  http.get('/projects', () => {
    return HttpResponse.json(runtimeProjects);
  }),

  http.get('/projects/:id', ({ params }) => {
    const project = runtimeProjects.find(p => p.id === params.id);
    if (project) {
      return HttpResponse.json(project);
    }
    return HttpResponse.json({ error: 'Project not found' }, { status: 404 });
  }),

  http.post('/projects', async ({ request }) => {
    const projectData = await request.json() as any;
    const newProject = {
      id: String(runtimeProjects.length + 1),
      ...projectData,
      status: 'PILOTO' as const,
      economy: 0,
      impacted: 0,
      startedAt: new Date().toISOString()
    };
    
    runtimeProjects.push(newProject);
    return HttpResponse.json(newProject);
  }),

  // Insights endpoints
  http.get('/aurora/insights', () => {
    // Simulate some variation in insights
    const variations = [
      { ...currentInsights[0], title: 'Workshops de Co-criação' },
      { ...currentInsights[1], title: 'Dashboard de Resultados' },
      { ...currentInsights[2], title: 'Sistema de Recompensas' }
    ];
    
    // Randomly mix original and variations
    const mixedInsights = currentInsights.map((insight, index) => 
      Math.random() > 0.5 ? variations[index] || insight : insight
    );
    
    return HttpResponse.json(mixedInsights);
  }),

  // Chat endpoints
  http.post('/aurora/chat', async ({ request }) => {
    const { message } = await request.json() as { message: string };
    
    let response = '';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ideia')) {
      response = 'Para estruturar sua ideia, considere: 1) Qual problema resolve? 2) Qual o impacto esperado? 3) Como medir o sucesso? Posso ajudar você a desenvolver um canvas da inovação!';
    } else if (lowerMessage.includes('mapa')) {
      response = 'O mapa de ideias é uma ótima ferramenta! Sugiro adicionar coordenadas geográficas às suas ideias para visualizar a distribuição de inovações pela empresa.';
    } else if (lowerMessage.includes('projeto')) {
      response = 'Ótimo! Para transformar uma ideia em projeto, defina: escopo, cronograma, recursos necessários e KPIs. Quer que eu ajude a criar um plano de implementação?';
    } else {
      response = 'Entendi! Como posso ajudar você a inovar hoje? Posso sugerir estruturas para suas ideias, dicas de implementação ou estratégias de engajamento.';
    }
    
    return HttpResponse.json({ 
      message: response,
      timestamp: new Date().toISOString()
    });
  })
];