import { http, HttpResponse } from 'msw';
import dbData from '../data/db.json';

// Store for runtime data (initialized from static JSON)
let runtimeUsers = [...dbData.users];
let runtimeIdeas = [...dbData.ideas];
let runtimeProjects = [...dbData.projects];
let currentInsights = [...dbData.insights];

export const handlers = [
  // Auth endpoints
  http.post('/auth/login', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    let user = runtimeUsers.find(u => u.email === email);
    
    // Auto-create user for @koraone.com emails if not found
    if (!user && email.endsWith('@koraone.com')) {
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
    
    if (user) {
      return HttpResponse.json({
        user,
        token: `mock-token-${Date.now()}`
      });
    }
    
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }),

  http.post('/auth/register', async ({ request }) => {
    const { email } = await request.json() as { email: string };
    
    const newUser = {
      id: String(runtimeUsers.length + 1),
      name: 'Novo Usuário',
      email,
      avatar: email.charAt(0).toUpperCase() + email.charAt(email.indexOf('@') - 1).toUpperCase()
    };
    
    runtimeUsers.push(newUser);
    
    return HttpResponse.json({
      user: newUser,
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