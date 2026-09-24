# 🖥️ Manual de Estrutura e Arquivos — Frontend (EquiTrack)

Este documento tem como objetivo servir como guia oficial para novos desenvolvedores, detalhando a arquitetura, convenções, organização de pastas e arquivos da aplicação Frontend do **EquiTrack**.

---

## 📌 1. Visão Geral da Stack do Frontend

O frontend é construído com as seguintes tecnologias e padrões:

| Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Biblioteca base para construção da interface declarativa em componentes. |
| **TypeScript** | `^5.5.3` | Tipagem estática para previsibilidade e contratos de dados seguros. |
| **Vite** | `^5.4.0` | Build tool e servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR). |
| **React Router Dom** | `^7.18.3` | Gerenciamento de rotas e navegação SPA (Single Page Application). |
| **Axios** | `^1.20.0` | Cliente HTTP baseado em Promises para comunicação com o Backend. |
| **CSS Modules** | Nativo | Estilização escopada por componente, evitando colisões de classes CSS. |

---

## 🗂️ 2. Árvore de Diretórios do Frontend

Abaixo está o mapa completo da pasta [`equitrack/frontend`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend):

```text
equitrack/frontend/
├── public/                     # Arquivos estáticos públicos servidos diretamente
├── src/                        # Código-fonte principal da aplicação
│   ├── assets/                 # Recursos visuais estáticos (ícones, logos, imagens)
│   │   ├── icons/              # Ícones em formato SVG (ex: voltar.svg, people-fill.svg)
│   │   ├── img/                # Imagens gerais da aplicação (ex: logo.png, list.svg)
│   │   └── placeholders/       # Imagens temporárias e avatares mockados
│   │
│   ├── components/             # Componentes React reutilizáveis (Design System)
│   │   ├── cards/              # Cards de exibição de dados e entidades
│   │   │   ├── CavaloCard/
│   │   │   ├── EquoterapeutaCard/
│   │   │   ├── LastSessionCard/
│   │   │   ├── NavCard/
│   │   │   └── PraticanteCard/
│   │   ├── layout/             # Componentes de estrutura e casca da aplicação
│   │   │   ├── EntityListLayout/ # Layout padrão para telas de listagem e busca
│   │   │   ├── Footer/         # Rodapé da aplicação
│   │   │   └── Header/         # Cabeçalho com título e botão de voltar
│   │   └── ui/                 # Componentes básicos / atômicos de interface
│   │       ├── Button/         # Botões customizados (variantes: primary, ghost, etc.)
│   │       ├── Divider/        # Linhas divisórias estilizadas com cores do tema
│   │       ├── Input/          # Campo de texto de formulário padronizado
│   │       ├── SearchInput/    # Campo de busca específico com ícone
│   │       └── TextArea/       # Área de texto multilinha padronizada
│   │
│   ├── contexts/               # Contextos globais da aplicação React (Context API)
│   │   └── authContext.tsx     # Gerenciamento de sessão, autenticação e usuário
│   │
│   ├── hooks/                  # Hooks customizados
│   │   └── useAuth.tsx         # Hook de conveniência para consumir o AuthContext
│   │
│   ├── pages/                  # Telas e rotas da aplicação
│   │   ├── AdminDashboard/     # Painel principal administrativo desktop/web
│   │   ├── HomeMobile/         # Visão inicial simplificada para mobile
│   │   ├── Lists/              # Telas de listagem de entidades
│   │   │   ├── CavaloList/
│   │   │   ├── EquoterapeutaList/
│   │   │   └── PraticanteList/
│   │   └── ViewForms/          # Telas de cadastro e edição de formulários
│   │       ├── CavaloForm/
│   │       ├── EquoterapeutaForm/
│   │       └── PraticanteForm/
│   │
│   ├── services/               # Camada de comunicação com a API REST (Axios)
│   │   ├── api.ts              # Instância base do Axios com baseURL e interceptors
│   │   ├── CavaloService.ts    # Métodos HTTP para a entidade Cavalo
│   │   ├── EquoterapeutaService.ts # Métodos HTTP para a entidade Equoterapeuta
│   │   └── PraticanteService.ts # Métodos HTTP para a entidade Praticante
│   │
│   ├── styles/                 # Estilos globais e tokens de design
│   │   ├── global.css          # Estilos gerais e fontes aplicadas ao app
│   │   ├── reset.css           # Reset de margens e paddings nativos do browser
│   │   └── variables.css       # Variáveis CSS (cores, tipografia, espaçamentos)
│   │
│   ├── types/                  # Definições de Tipos e Interfaces TypeScript
│   │   └── index.tsx           # Interfaces centrais (ICavalo, IPraticante, IEquoterapeuta)
│   │
│   ├── App.tsx                 # Roteamento central e composição de Providers
│   └── main.tsx                # Ponto de entrada do React (ReactDOM.createRoot)
│
├── index.html                  # HTML principal da SPA
├── package.json                # Dependências e scripts do projeto frontend
├── tsconfig.json               # Configurações do compilador TypeScript
└── vite.config.ts              # Configurações do Vite (plugins, portas, aliases)
```

---

## 🔍 3. Detalhamento dos Módulos e Pastas

### 🎨 `src/styles/` — Design System e Tokens
Centraliza todas as propriedades de identidade visual do EquiTrack:
- [`variables.css`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/styles/variables.css): Define as variáveis CSS (`:root`) utilizadas em todo o sistema.
  - **Cores principais:**
    - `--fundoBranco`: `#EEECE6` (Fundo padrão da aplicação)
    - `--fundoBrancoCard`: `#D9D9D9`
    - `--corBranca`: `#EAE7DF`
    - `--corPreta`: `#000000`
    - `--corVerdeClaro`: `#2D4A27`
    - `--corVerdeEscuro`: `#071804`
    - `--corDourada`: `#A85A2A`
  - **Tipografia:** Fonte padrão `'Inter'`, além de escalas de tamanho e line-height para títulos, botões e textos auxiliares.

---

### 🧩 `src/components/` — Camada de Componentes
Seguindo o princípio de responsabilidade única, os componentes são isolados:

1. **`components/ui/`**: Componentes atômicos reutilizáveis em qualquer parte:
   - [`Button`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/ui/Button/Button.tsx): Suporta variantes de estilo (ex: `primary`, `ghost`) e tamanhos.
   - [`Input`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/ui/Input/Input.tsx): Input com label integrada e estilo consistente.
   - [`SearchInput`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/ui/SearchInput/SearchInput.tsx): Campo de busca customizado.
   - [`TextArea`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/ui/TextArea/TextArea.tsx): Para observações longas e diagnósticos.
   - [`Divider`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/ui/Divider/Divider.tsx): Linha separadora com espessuras e cores configuráveis.

2. **`components/cards/`**: Componentes visuais para apresentar itens de listagens:
   - [`PraticanteCard`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/cards/PraticanteCard/PraticanteCard.tsx): Exibe nome do praticante, status ativo/inativo e atalho para edição.
   - [`CavaloCard`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/cards/CavaloCard/CavaloCard.tsx): Exibe dados do cavalo e ações.
   - [`EquoterapeutaCard`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/cards/EquoterapeutaCard/EquoterapeutaCard.tsx): Exibe dados profissionais e especialidade.
   - [`NavCard`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/cards/NavCard/NavCard.tsx): Cards de navegação utilizados nos dashboards.

3. **`components/layout/`**: Estruturas de página:
   - [`Header`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/layout/Header/Header.tsx): Cabeçalho com botão de voltar histórico (`useNavigate()`) e título.
   - [`EntityListLayout`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/components/layout/EntityListLayout/EntityListLayout.tsx): Componente reutilizável que encapsula o botão de adicionar novo registro, a barra de pesquisa e a grade de cards.

---

### 📄 `src/pages/` — Telas da Aplicação
As telas estão organizadas em:
- **`Lists/`**: Telas que buscam coleções no backend e renderizam listas filtráveis:
  - [`PraticanteList.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/Lists/PraticanteList/PraticanteList.tsx) (`/praticantes`)
  - [`CavaloList.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/Lists/CavaloList/CavaloList.tsx) (`/cavalos`)
  - [`EquoterapeutaList.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/Lists/EquoterapeutaList/EquoterapeutaList.tsx) (`/equoterapeutas`)
- **`ViewForms/`**: Telas de formulário para criação e edição:
  - [`PraticanteForm.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/ViewForms/PraticanteForm/PraticanteForm.tsx) (`/praticantes/novo`, `/praticantes/editar/:id`)
  - [`CavaloForm.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/ViewForms/CavaloForm/CavaloForm.tsx) (`/cavalos/novo`, `/cavalos/editar/:id`)
  - [`EquoterapeutaForm.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/ViewForms/EquoterapeutaForm/EquoterapeutaForm.tsx) (`/equoterapeutas/novo`, `/equoterapeutas/editar/:id`)
- **Dashboards:**
  - [`AdminDashboard.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/AdminDashboard/AdminDashboard.tsx) (`/admin`)
  - [`HomeMobile.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/pages/HomeMobile/HomeMobile.tsx) (`/`)

---

### 📡 `src/services/` — Camada de Serviços da API
Isola todas as chamadas HTTP dos componentes React.

- [`api.ts`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/services/api.ts): Cria e exporta a instância central do Axios:
  ```typescript
  export const api = axios.create({
      baseURL: 'http://localhost:3000/api',
      headers: { 'Content-Type': 'application/json' }
  });
  ```
- **Services específicos**: Exportam objetos com métodos assíncronos fortemente tipados com as interfaces de `src/types/`:
  - [`PraticanteService.ts`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/services/PraticanteService.ts)
  - [`CavaloService.ts`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/services/CavaloService.ts)
  - [`EquoterapeutaService.ts`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/services/EquoterapeutaService.ts)

---

### 🏷️ `src/types/` — Modelagem de Dados
Arquivo [`index.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/types/index.tsx) que define os contratos de entidades:
- `ICavalo`: `{ id?, nome, raca, idade?, caracteristicas?, ativo? }`
- `IPraticante`: `{ id?, nome, dataNascimento, diagnostico, nomeResponsavel, telefoneResponsavel, ativo? }`
- `IEquoterapeuta`: `{ id?, nome, especialidade, registroProfissional, telefone, ativo? }`

---

## 🛠️ 4. Padrões de Código e Guia Prático

### Como Criar um Novo Componente
1. Crie a pasta em `src/components/<categoria>/<NomeDoComponente>/`.
2. Adicione os arquivos:
   - `<NomeDoComponente>.tsx`: Código React com declaração da interface de Props.
   - `<NomeDoComponente>.module.css`: Estilos escopados.
   - `index.tsx`: Re-exportação opcional para simplificar imports (`export * from './<NomeDoComponente>'`).
3. Importe variáveis de cores e tipografia de `src/styles/variables.css`.

### Como Adicionar uma Nova Rota
1. Crie o componente de página dentro de `src/pages/`.
2. Abra [`src/App.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/App.tsx).
3. Adicione o `<Route path="/sua-rota" element={<SuaPagina />} />` dentro do `<Routes>`.

### Como Rodar o Frontend Localmente
```bash
cd equitrack/frontend
npm install
npm run dev
```
> Acesse: `http://localhost:5173`
