# 🌟 KoraOne – Hub de Inovação Corporativa

> Plataforma digital para engajar colaboradores em inovação, desde a ideação até a implementação de projetos.
>
> **⚠️ Esta versão está em *Modo Demo*** com **Mock Service Worker (MSW)**. O contrato de API já está pronto para ser substituído pelo backend real (Spring Boot + MySQL).

---

## 🚀 Modo Demo (Pitch)

### Pré-requisitos

* Node.js 18+
* npm / yarn / bun

### Rodar em Demo Mode

```bash
# Instalar dependências
npm install

# Rodar em modo demo
npm run dev

# Acessar (fullscreen para o pitch):
http://localhost:5173
```

### Login Demo

* **E-mail existente:** `guilherme@koraone.com` | `hugo@koraone.com`
* **Novo e-mail:** qualquer `nome@koraone.com` → auto-registro ativado
* **Crachá:** botão de login rápido

---

## 📱 Funcionalidades

### 🔐 Autenticação

* Login corporativo simulado
* Auto-registro para novos usuários
* Sessão persistida (localStorage)

### 💡 Ideias

* Criar ideias com formulário completo (localização opcional)
* Vitrine responsiva com filtros
* Curtidas em tempo real
* Destaque automático com `?highlight=id`

### 🗺️ Mapa

* Visualização geográfica com Leaflet
* Markers com popups → link para feed
* Renderização client-side segura

### 📊 Minha Trilha

* KPIs do usuário: Enviadas | Aprovadas | Curtidas | Score
* Histórico completo das ideias

### 🏗️ Projetos

* Conversão de ideias aprovadas em projetos
* Timeline (Proposto → Piloto → Ativo → Concluído)
* KPIs: economia gerada, pessoas impactadas

### 🧠 Insights Aurora

* Recomendações categorizadas
* Botão “Gerar novas recomendações” (refetch dinâmico)

### 💬 Assistente Aurora

* Chat funcional com respostas mockadas
* Botões rápidos: “Melhorar ideia”, “Exemplos de impacto”, “Medição de sucesso”

### 🎨 Design

* Tema dark corporativo
* Gradientes, glass effect e animações Framer Motion
* Componentes shadcn/ui customizados

---

## 🛠️ Stack Técnica

**Frontend:** React 18 + TypeScript, Vite, Tailwind, shadcn/ui, Zustand, React Router, Framer Motion
**Mock Backend:** MSW (Mock Service Worker) com handlers de API
**Mapa:** React Leaflet + OpenStreetMap
**Testes:** Vitest + React Testing Library

---

## 📂 Estrutura

```
src/
├── components/     # UI & layout
├── pages/          # Páginas principais
├── stores/         # Zustand stores
├── mocks/          # Handlers MSW
├── types/          # Tipagens
├── tests/          # Testes unitários
└── lib/            # Utils & api adapter
```

---

## 🔄 Futuro (Modo Real)

* **Backend sugerido:** Spring Boot + MySQL
* **Contratos de API já prontos no adapter (`src/lib/api.ts`)**
* Basta trocar variáveis de ambiente:

```bash
VITE_USE_MSW=false
VITE_API_URL=http://localhost:8080/api
```

### Entities principais:

* User
* Idea
* Project
* Like

### Endpoints planejados:

* `POST /auth/login`, `POST /auth/register`, `GET /me`
* `GET /ideas`, `POST /ideas`, `POST /ideas/{id}/like`, `GET /ideas/map`
* `GET /projects`, `POST /projects`, `GET /projects/{id}`
* `GET /aurora/insights`, `POST /aurora/chat`

---

## 🎯 Roadmap (O que falta para 100%)

### Autenticação Corporativa Real

* Integração LDAP/AD para login empresarial
* OAuth2/SAML para SSO
* Perfis e permissões avançadas (admin, gestor, colaborador)

### Upload e Mídia

* AWS S3 / Azure Blob para armazenamento
* Compressão automática de imagens
* Suporte a vídeos para ideias

### Business Intelligence

* Dashboard executivo com métricas agregadas
* Relatórios customizáveis
* Exportação para Excel/PDF

### IA Real (Substituir Mocks)

* OpenAI GPT-4 para chat contextual
* Análise de sentimento em descrições
* Recomendação de categorias via ML
* Detecção de duplicatas

### Integrações Empresariais

* Microsoft Teams / Slack para notificações
* Jira / Trello para gestão de projetos
* Power BI / Tableau para visualizações avançadas

### Performance & Escalabilidade

* Redis para cache
* CDN para assets
* Load balancer para HA
* Monitoring (Prometheus/Grafana)

---

## 🏃 Scripts

```bash
npm run dev       # Modo demo (MSW)
npm run build     # Build produção
npm run preview   # Preview build
npm run test      # Testes unitários
npm run lint      # ESLint
```

---

## 📋 Checklist Sprint 3

* [x] Sidebar responsiva (drawer em mobile, fixa em desktop)
* [x] Feed com highlight e likes
* [x] Mapa funcional com markers
* [x] KPIs corretos na Trilha
* [x] Projetos com timeline
* [x] Insights com refetch
* [x] Chat Aurora funcional
* [x] Testes básicos rodando
* [x] README completo

---

**Desenvolvido para KoraOne Corp** ✨
*Transformando ideias em inovação corporativa.*
