# KoraOne - Hub de Inovação Corporativa

> Plataforma digital para engajar colaboradores em inovação, desde ideação até implementação de projetos.

## 🚀 Modo Demo (Para Pitch)

### Pré-requisitos
- Node.js 18+
- npm/yarn/bun

### Executar Demo
```bash
# Instalar dependências
npm install

# Rodar em modo demo
npm run dev

# Para pitch: abrir em fullscreen
# Acesse: http://localhost:5173
# Login automático: guilherme@koraone.com ou qualquer email @koraone.com
```

**Login Demo:**
- **E-mail existente:** `guilherme@koraone.com` ou `hugo@koraone.com`
- **Novo e-mail:** Qualquer `nome@koraone.com` (auto-registro ativado)
- **Crachá:** Clique no botão para login rápido

## 📱 Funcionalidades Implementadas

### 🔐 Autenticação
- Login corporativo com auto-registro
- Persistência de sessão (localStorage)
- Fallback para usuário "Novo Usuário"

### 💡 Gestão de Ideias
- **Criação:** Formulário completo com localização opcional
- **Vitrine:** Grid responsivo com busca e filtros
- **Curtidas:** Sistema de engajamento em tempo real
- **Destaque:** URL `?highlight=id` para scroll automático

### 🗺️ Mapa de Ideias
- Visualização geográfica com Leaflet
- Pop-ups interativos com link para feed
- Filtragem por status
- Renderização client-side

### 📊 Minha Trilha
- KPIs personalizados: Enviadas | Aprovadas | Curtidas | Score
- Histórico de ideias do usuário
- Cálculo de impacto dinâmico

### 🏗️ Projetos
- Conversão de ideias aprovadas em projetos
- Timeline de execução (Piloto → Ativo → Concluído)
- KPIs de economia e pessoas impactadas
- Detalhamento por projeto

### 🧠 Insights Aurora (IA)
- Recomendações baseadas em categorias
- Botão "Gerar Novas Recomendações" com refetch
- Interface para IA generativa

### 💬 Assistente Aurora
- Chat funcional com respostas contextuais
- Botões rápidos para ações comuns
- Interface conversacional limpa

### 🎨 Design System
- Tema dark corporativo
- Gradientes e glass effects
- Animações com Framer Motion
- Componentes shadcn/ui customizados

## 🛠️ Tecnologias

### Frontend
- **React 18** + TypeScript
- **Vite** para build e dev server
- **Tailwind CSS** para styling
- **shadcn/ui** para componentes
- **Framer Motion** para animações
- **React Router** para navegação
- **Zustand** para state management

### Mock Backend
- **MSW (Mock Service Worker)** 
- Handlers para todas as APIs
- Dados persistentes na sessão
- Respostas realistas com delay

### Mapa & Localização
- **React Leaflet** para mapas interativos
- **OpenStreetMap** como provider
- Markers customizados com popups

### Testes
- **Vitest** + **React Testing Library**
- Testes unitários para login, criação e mapa
- Mocks para componentes de terceiros

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components
│   └── ErrorBoundary.tsx   # Error handling
├── pages/                  # Route components
├── stores/                 # Zustand stores
├── mocks/                  # MSW handlers
├── tests/                  # Test files
├── types/                  # TypeScript types
└── lib/                    # Utilities
```

## 🔄 Modo Real (Futuro)

### Substituir MSW por Backend Real

1. **Remover MSW:**
```bash
npm uninstall msw
```

2. **Configurar API Base:**
```typescript
// src/lib/api.ts
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = {
  auth: {
    login: (email: string) => fetch(`${API_BASE}/auth/login`, { ... }),
    register: (email: string) => fetch(`${API_BASE}/auth/register`, { ... })
  },
  ideas: {
    list: () => fetch(`${API_BASE}/ideas`),
    create: (data) => fetch(`${API_BASE}/ideas`, { method: 'POST', ... }),
    like: (id) => fetch(`${API_BASE}/ideas/${id}/like`, { method: 'POST' })
  }
  // ... outras APIs
};
```

3. **Atualizar Stores:**
```typescript
// Substituir fetch('/ideas') por api.ideas.list()
```

### Backend Sugerido (Spring Boot + MySQL)

```
koraone-api/
├── src/main/java/com/koraone/
│   ├── controller/         # REST Controllers
│   ├── service/           # Business Logic
│   ├── repository/        # Data Access
│   ├── entity/           # JPA Entities
│   └── dto/              # Data Transfer Objects
├── src/main/resources/
│   ├── application.yml   # Database config
│   └── data.sql         # Seed data
└── pom.xml
```

**Entities principais:**
- `User` (id, name, email, avatar)
- `Idea` (id, title, description, impact, status, location, authorId)
- `Project` (id, title, status, economy, impacted, startedAt)
- `Like` (userId, ideaId)

## 🎯 O que falta para 100%

### Autenticação Corporativa Real
- **Integração LDAP/AD** para login empresarial
- **OAuth2/SAML** para SSO
- **Roles e permissões** (admin, gestor, colaborador)

### Upload e Mídia
- **AWS S3 / Azure Blob** para armazenamento
- **Compressão de imagens** automática
- **Suporte a vídeos** para apresentação de ideias

### Business Intelligence
- **Dashboard executivo** com métricas agregadas
- **Relatórios personalizáveis** por período/categoria
- **Exportação para Excel/PDF**

### IA Real (Substituir Mocks)
- **OpenAI GPT-4** para chat contextual
- **Análise de sentimento** em descrições
- **Recomendações baseadas em ML** para categorização automática
- **Detecção de duplicatas** para evitar ideias repetidas

### Integrações Empresariais
- **Microsoft Teams/Slack** para notificações
- **Jira/Trello** para gestão de projetos
- **Power BI/Tableau** para visualizações avançadas

### Performance & Escala
- **Redis** para cache de sessões
- **CDN** para assets estáticos
- **Load balancer** para alta disponibilidade
- **Monitoring** com Prometheus/Grafana

## 🏃‍♂️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Dev server com MSW ativo

# Build
npm run build        # Build para produção
npm run preview      # Preview do build

# Testes  
npm run test         # Roda todos os testes
npm run test:ui      # Interface visual dos testes

# Linting
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix issues
```

## 📋 Checklist Final (100% ✅)

- ✅ Sidebar responsiva (drawer em mobile, fixa em desktop)
- ✅ Mapa funcional com markers e popups
- ✅ Insights com refetch dinâmico
- ✅ Auto-registro para novos e-mails
- ✅ Chat IA funcional com Aurora
- ✅ Projetos com conversão de ideias aprovadas
- ✅ Feed com highlight e sistema de likes
- ✅ Trilha com KPIs corretos
- ✅ Testes unitários implementados
- ✅ ErrorBoundary para tratamento de erros
- ✅ MSW configurado para todas as APIs
- ✅ README completo com guias

---

**Desenvolvido para KoraOne Corp** 🚀  
*Transformando ideias em inovação corporativa*