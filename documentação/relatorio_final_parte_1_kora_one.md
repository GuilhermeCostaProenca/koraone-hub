# RELATÓRIO FINAL DE PROJETO – ENTERPRISE CHALLENGE FIAP / EUROFARMA

## Projeto: KoraOne – Hub de Inovação Corporativa

### 1. Introdução

#### 1.1 Objetivos e Escopo
O projeto **KoraOne – Hub de Inovação Corporativa** tem como objetivo central criar uma plataforma digital para **engajar colaboradores na inovação interna**, desde a **geração de ideias (ideação)** até a **implementação de projetos** resultantes dessas ideias. O foco principal é transformar o processo de inovação em algo acessível, colaborativo e mensurável, promovendo uma cultura de **intraempreendedorismo** dentro das organizações.

Em termos de escopo, o desenvolvimento concentrou-se em um **frontend web funcional** (utilizando React e TypeScript) operando em **modo demo**, com **APIs simuladas** via *Mock Service Worker (MSW)*. Paralelamente, foi definida a **arquitetura de um backend real** a ser implementado com Spring Boot (Java) e banco de dados MySQL, garantindo que a transição para um ambiente de produção seja viável e direta. A solução cobre o fluxo completo da gestão de ideias inovadoras dentro da empresa, proporcionando **acessibilidade, transparência e engajamento gamificado** para o usuário final.

#### 1.2 Fundamentação Teórica
O tema do projeto está inserido no contexto de **inovação colaborativa corporativa** e **gestão de ideias**, conceitos que refletem uma tendência crescente nas organizações modernas: valorizar o conhecimento interno e transformar ideias de colaboradores em resultados tangíveis. Plataformas desse tipo são projetadas para facilitar a **geração, curadoria, avaliação e execução** de ideias dentro das empresas.

Estudos recentes embasam a relevância desse projeto:
- Segundo a **Gallup (2022)**, apenas **21% dos colaboradores no mundo estão engajados** em seu trabalho, demonstrando a necessidade urgente de mecanismos que aumentem a motivação e a participação ativa dos funcionários.
- A **PwC (2023)** aponta que empresas com programas estruturados de inovação interna têm **25% mais sucesso** no lançamento de novos produtos e serviços.
- De acordo com a **Deloitte (2024)**, hubs de inovação podem elevar em até **30% a retenção de talentos**, pois colaboradores se sentem mais valorizados quando participam da criação de soluções reais.

Esses dados reforçam a importância de se criar ferramentas que conectem **pessoas, ideias e resultados**. O KoraOne combina **inovação aberta**, **gamificação** e **inteligência artificial** para criar um ecossistema digital que incentiva a criatividade e a colaboração.

#### 1.3 Storytelling – Contextualização e Solução
Imagine uma empresa como a Eurofarma, com centenas de colaboradores distribuídos por diversas unidades. Ideias inovadoras surgem diariamente — mas sem um canal estruturado, muitas acabam se perdendo em conversas informais ou e-mails esquecidos. O **KoraOne** nasce para resolver exatamente essa dor: **dar voz às ideias e transformá-las em resultados concretos**.

O colaborador *João*, por exemplo, tem uma sugestão para otimizar um processo fabril. Antes, ele não sabia a quem recorrer. Com o KoraOne, João acessa uma plataforma moderna e intuitiva, preenche um formulário e compartilha sua ideia. Em instantes, ela aparece no **feed de inovação**, onde colegas podem curtir e comentar. Essa interação gera **reconhecimento e engajamento**. Além disso, a ideia de João é exibida no **mapa de inovação**, que mostra visualmente de onde vêm as contribuições dentro da empresa.

O diferencial está na presença da **assistente virtual Aurora**, uma inteligência artificial que orienta o colaborador. João pode conversar com a Aurora para melhorar a descrição de sua ideia, entender métricas de impacto ou receber insights sobre temas relacionados. A Aurora atua como uma mentora digital, democratizando o acesso à inovação.

Após o envio, a ideia entra em uma **fila de curadoria** onde gestores avaliam seu potencial. Se aprovada, ela é convertida em um **projeto** e acompanhada na plataforma até a implementação. O colaborador pode ver o progresso e métricas como **pessoas impactadas e economia gerada**, criando um ciclo de motivação contínuo.

O KoraOne, portanto, não é apenas uma ferramenta tecnológica. É um **catalisador de cultura organizacional**, projetado para transformar o colaborador comum em **agente ativo de inovação**.

---

### 2. Metodologia

#### 2.1 Fases do Projeto
A metodologia adotada foi o **Scrum**, permitindo entregas rápidas, iterativas e adaptáveis às mudanças. O projeto foi estruturado em **quatro sprints**:

- **Sprint 1 – Descoberta e Requisitos:** levantamento de necessidades, definição do backlog e criação dos primeiros protótipos de interface no Figma.
- **Sprint 2 – Arquitetura:** definição da arquitetura baseada em TOGAF, configuração do ambiente de desenvolvimento e estrutura de pastas (frontend React + TypeScript).
- **Sprint 3 – Desenvolvimento do MVP:** implementação das funcionalidades principais (feed de ideias, mapa, trilha do usuário, projetos e IA simulada via MSW). Testes unitários com Vitest e React Testing Library.
- **Sprint 4 – Refinamento e Entrega:** ajustes finais de UI/UX, responsividade, animações (Framer Motion), documentação e relatório final em formato ABNT.

#### 2.2 Tecnologias e Ferramentas
| Categoria | Tecnologias | Licença |
|------------|--------------|----------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, shadcn/ui, Zustand, React Router, Framer Motion | Gratuita/Open Source |
| **Backend (planejado)** | Spring Boot 3, Java 17, MySQL 8, Hibernate, Flyway | Gratuita/Open Source |
| **Testes** | Vitest, React Testing Library, Mock Service Worker (MSW) | Gratuita/Open Source |
| **DevOps** | Docker, Docker Compose, GitHub Actions, Swagger | Gratuita/Open Source |
| **Design/IA** | Figma (free/edu), Cursor (free/paid), Lovable (IA Design Assist) | Gratuita/Trial |
| **Analytics (futuro)** | Microsoft Power BI Pro | Paga |

> **Observação:** Todas as tecnologias utilizadas na versão MVP são gratuitas. Ferramentas pagas foram consideradas apenas em simulação para o ambiente corporativo futuro.

#### 2.3 Diagrama de Funcionamento e Casos de Uso
Os principais **casos de uso** da solução incluem:
- **Login corporativo:** autenticação de usuários (simulada com domínio @koraone.com; futuro SSO/LDAP real).
- **Criação e curadoria de ideias:** colaboradores submetem ideias, curadores avaliam e aprovam.
- **Feed de ideias:** listagem pública com curtidas e status de aprovação.
- **Mapa de inovação:** visualização geográfica das ideias submetidas.
- **Projetos:** acompanhamento de ideias aprovadas com KPIs de impacto.
- **Minha Trilha:** painel do colaborador com seus resultados e pontuação.
- **Aurora IA:** assistente de chat para insights e mentoria.

```mermaid
flowchart LR
  U[Usuário] --> FE[Frontend React/TypeScript]
  FE --> MSW[Mock API (Demo)]
  FE --> API[Backend Spring Boot (Prod)]
  API --> DB[(MySQL)]
  API --> AI[Aurora IA]
  FE --> MAP[Mapa (React Leaflet / OSM)]
```

O fluxo demonstra como o frontend se comunica com APIs simuladas via **MSW** e, futuramente, com o **backend real**, mantendo o mesmo contrato REST. Essa arquitetura modular e escalável facilita a migração para produção sem refatorações profundas.

---

### 3. Discussão

#### 3.1 Prazo e Desempenho
O projeto cumpriu o cronograma planejado e entregou um MVP funcional e validado. Se o prazo fosse maior, seriam implementadas funcionalidades complementares como **autenticação corporativa (SSO)**, **upload de mídias**, **painéis Power BI** e a **integração completa com IA generativa**.

#### 3.2 Estimativa de Custo
**Custo Humano (3 meses, 200h):** cerca de **R$ 9.200**, considerando quatro papéis (Tech Lead, dois Devs e UX Designer).  
**Custo Técnico:** infraestrutura em nuvem, domínio e licenças (~R$ 1.000).  
**Custo Total Estimado:** **R$ 10.200**, adequado ao porte de um piloto corporativo.

---

### 4. Lições Aprendidas
- O uso do **MSW** permitiu simular o backend com realismo e acelerar o desenvolvimento.  
- **Design centrado no usuário** foi essencial para engajar diferentes perfis de colaboradores.  
- A **documentação e a comunicação ágil** evitaram retrabalho e facilitaram o versionamento.  
- A combinação de **IA + gamificação** demonstrou grande potencial de retenção e engajamento.

---

### 5. Conclusão
O **KoraOne** atingiu plenamente os objetivos do desafio: propor uma solução inovadora, escalável e com valor tangível para o negócio. A plataforma conecta pessoas e ideias, promovendo um ecossistema de inovação sustentável. O MVP validou a viabilidade técnica e a aceitação do conceito. Com baixo custo e arquitetura preparada para produção, o projeto se mostra **tecnicamente sólido, financeiramente viável e de alto impacto organizacional**.

---

### Referências Bibliográficas
- GALLUP. *State of the Global Workplace: 2022*. Washington, DC: Gallup, 2022.
- PWC. *Innovation and Culture Report*. New York: PwC, 2023.
- DELOITTE. *Corporate Innovation Trends*. London: Deloitte, 2024.
- QUÍKER. *Plataforma de Ideias: O Que São e Exemplos*. São Paulo: Quíker, 2024.
- FIAP. *Enterprise Challenge Eurofarma – Regulamento 2025*. São Paulo: FIAP, 2025.

