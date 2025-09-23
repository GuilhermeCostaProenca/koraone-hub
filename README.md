# KoraOne - Hub de Inovação Corporativa

Uma plataforma colaborativa moderna para transformar ideias em inovação, desenvolvida com React, TypeScript, TailwindCSS e tecnologias de ponta.

## 🚀 Funcionalidades

### Autenticação & Perfil
- **Login Inteligente**: Acesso por e-mail corporativo ou crachá (simulado)
- **Estado Global**: Gerenciamento com Zustand e persistência local
- **Proteção de Rotas**: Navegação segura e controle de acesso

### Gestão de Ideias
- **Criação Intuitiva**: Formulário completo com título, descrição, impacto e localização
- **Vitrine Interativa**: Grid responsivo com filtros e busca
- **Sistema de Curtidas**: Engajamento da comunidade
- **Status Dinâmico**: Acompanhamento de aprovação (enviada → em avaliação → aprovada)

### Visualização Geoespacial  
- **Mapa Interativo**: Leaflet com marcadores personalizados
- **Localização de Ideias**: Coordenadas opcionais para projetos
- **Detalhes no Popup**: Informações rápidas ao clicar nos marcadores

### Trilha Pessoal
- **Dashboard Individual**: KPIs pessoais (enviadas, aprovadas, likes)
- **Score de Impacto**: Gamificação baseada em aprovações e engajamento
- **Histórico Completo**: Timeline das contribuições

### Insights Inteligentes (Aurora IA)
- **Recomendações Personalizadas**: Sugestões baseadas em padrões e tendências
- **Categorização**: Colaboração, Comunicação, Conteúdo, Conhecimento, Engajamento
- **Interface Moderna**: Cards interativos com animações sutis

## 🛠️ Tecnologias

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** + **shadcn/ui** para design system
- **Framer Motion** para animações
- **React Router** para navegação
- **React Query** para gerenciamento de estado servidor

### Backend (Mock)
- **MSW (Mock Service Worker)** para simulação de API
- **Zustand** para estado global cliente
- **LocalStorage** para persistência

### Mapas & Geolocalização
- **Leaflet** + **React Leaflet** para mapas interativos
- **Coordenadas customizáveis** para ideias

## 🎨 Design System

### Paleta de Cores
- **Background**: `#0E1116` (fundo principal)
- **Cards**: `#12151C` (containers)
- **Primary**: Azul inovação `hsl(217 91% 60%)`
- **Status Colors**: Verde (aprovada), Amarelo (avaliação), Azul (enviada)

### Tipografia
- **Font**: Inter (clean e moderna)
- **Hierarchy**: H1-H6 com `font-semibold` e `tracking-tight`

### Componentes
- **Rounded**: `rounded-2xl` como padrão
- **Shadows**: Elevação sutil com `shadow-card`
- **Glass Effect**: Backdrop blur para sobreposições
- **Animations**: Fade, scale e smooth transitions

## 📱 Responsividade

- **Mobile First**: Design adaptativo para todos os dispositivos
- **Navigation**: Sidebar collapse em mobile com overlay
- **Grid System**: Breakpoints otimizados (sm, md, lg, xl)
- **Touch Friendly**: Botões e interactions mobile-optimized

## 🚀 Como Executar

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acessar: http://localhost:8080
```

### Modo Demo (Pitch)
```bash
# Executar apresentação com dados seed
npm run pitch

# Servidor disponível na rede local para demos
```

### Build de Produção
```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 🧪 Dados de Exemplo

### Usuários
- **Guilherme Costa** (`guilherme@koraone.com`)
- **Hugo Oliveira** (`hugo@koraone.com`)

### Ideias Seed
1. **Clínicas Digitais** - Aprovada, 12 likes, São Paulo
2. **Mapa de Quebras** - Em avaliação, 7 likes, São Paulo  
3. **Fila Inteligente** - Enviada, 3 likes

### Insights Aurora
- Workshops Colaborativos
- Boletim Mensal de Impacto
- Vídeos Curtos de Inovação
- Biblioteca de Recursos
- Gamificação de Ideias

## 🔧 Configuração para Produção

### Variáveis de Ambiente
```env
# API Real (substituir mock)
VITE_API_BASE_URL=https://api.koraone.com
VITE_MAP_API_KEY=your_mapbox_key

# Autenticação
VITE_AUTH_DOMAIN=auth.koraone.com
VITE_JWT_SECRET=your_jwt_secret

# Uploads
VITE_STORAGE_BUCKET=koraone-media
```

### Substituir Mock por API Real
1. Remover configuração MSW em `src/main.tsx`
2. Implementar clients HTTP reais em `src/api/`
3. Ajustar stores para usar endpoints reais
4. Configurar interceptors para autenticação

### Deploy
```bash
# Build otimizado
npm run build

# Testar localmente
npm run preview

# Deploy (Vercel, Netlify, etc.)
```

## 🧪 Testes (Roadmap)

### Configuração Futura
- **Vitest** + **React Testing Library**
- **E2E** com Playwright
- **Visual Regression** com Chromatic

### Casos de Teste Prioritários
- Fluxo de login completo
- Criação e listagem de ideias
- Sistema de likes
- Filtros e busca
- Responsividade mobile

## 🎯 Acessibilidade

### Implementado
- **Contraste AA**: Cores validadas para legibilidade
- **Semantic HTML**: Uso correto de tags estruturais
- **Keyboard Navigation**: Navegação completa por teclado
- **Screen Readers**: Labels e ARIA attributes
- **Focus Visible**: Indicadores visuais claros
- **Button Sizing**: Mínimo 44px para touch

### Padrões Seguidos
- **WCAG 2.1 Level AA**
- **WAI-ARIA** guidelines
- **Semantic HTML5**

## 📄 Licença

Projeto desenvolvido para demonstração de capacidades técnicas em React e design system moderno.

---

**KoraOne** - Transformando ideias em inovação através da colaboração 🚀