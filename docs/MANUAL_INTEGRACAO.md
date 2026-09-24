# 🔗 Manual de Integração — Frontend ↔ Backend (EquiTrack)

Este documento explica como o frontend React e o backend Express se comunicam, qual o fluxo de dados de ponta a ponta, e as convenções que garantem o funcionamento da integração. É o documento obrigatório para entender como as duas camadas se conectam.

---

## 📌 1. Arquitetura Geral da Integração

```
┌──────────────────────────────┐          HTTP REST          ┌──────────────────────────────┐
│         FRONTEND             │   ────────────────────►     │          BACKEND             │
│   React + TypeScript + Vite  │                             │   Express + TypeScript       │
│     http://localhost:5173    │   ◄────────────────────     │     http://localhost:3000    │
└──────────────────────────────┘          JSON               └──────────────────────────────┘
                                                                           │
                                                                           ▼
                                                             ┌──────────────────────────────┐
                                                             │         BANCO DE DADOS       │
                                                             │    Prisma ORM + SQLite       │
                                                             │    (prisma/dev.db)           │
                                                             └──────────────────────────────┘
```

O frontend **nunca acessa o banco de dados diretamente**. Toda comunicação passa pela API do backend via chamadas HTTP.

---

## 🔄 2. Fluxo de Dados Completo (Ponta a Ponta)

Veja o fluxo completo de uma operação de cadastro, como exemplo o **cadastro de um Praticante**:

```
[Usuário preenche o formulário]
          │
          ▼
[PraticanteForm.tsx]
handleSubmit() → PraticanteService.criar(formData)
          │
          ▼
[PraticanteService.ts]
api.post('/praticantes', praticante)
          │
          ▼
[api.ts — Instância Axios]
baseURL: 'http://localhost:3000/api'
POST http://localhost:3000/api/praticantes
          │
          ▼
[server.ts — Express]
app.post('/api/praticantes', async (req, res) => {
    const novoPraticante = await prisma.praticante.create({ data: req.body });
    res.status(201).json(novoPraticante);
})
          │
          ▼
[Prisma ORM]
INSERT INTO "Praticante" (...) VALUES (...)
          │
          ▼
[SQLite — dev.db]
Dado gravado no banco de dados
          │
          ▼ (resposta sobe pelo mesmo caminho)
[Express] → res.status(201).json(novoPraticante)
          │
          ▼
[Axios] → retorna o objeto criado
          │
          ▼
[PraticanteForm.tsx]
alert('Praticante cadastrado com sucesso!')
```

---

## 🧩 3. Os Três Atores da Integração

### 1️⃣ `src/services/api.ts` — O Ponto de Entrada HTTP

```typescript
// src/services/api.ts
export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'Content-Type': 'application/json' },
});
```

**Responsabilidade:** Configurar a base da comunicação. É aqui que fica o endereço do backend. Se o backend mudar de porta ou ambiente, **apenas este arquivo precisa ser atualizado**.

Possui também um **interceptor de erros** global que captura falhas de rede e erros HTTP para logar no console.

---

### 2️⃣ `src/services/*Service.ts` — A Camada de Abstração

Os Services traduzem operações de negócio em chamadas HTTP. Eles garantem que os componentes React **nunca precisam saber** sobre URLs, verbos HTTP ou serialização JSON.

```typescript
// Exemplo — PraticanteService.ts
export const PraticanteService = {
    listarTodos: (): Promise<IPraticante[]>    → GET  /praticantes
    buscarPorId: (id): Promise<IPraticante>   → GET  /praticantes/:id
    criar:       (data): Promise<IPraticante> → POST /praticantes
    atualizar:   (id, data): Promise<...>     → PUT  /praticantes/:id  ⚠️ (sem rota no backend ainda)
    deletar:     (id): Promise<void>          → DELETE /praticantes/:id ⚠️ (sem rota no backend ainda)
};
```

---

### 3️⃣ `backend/src/server.ts` — O Receptor da API

Define todas as rotas HTTP e processa as requisições, delegando ao Prisma a persistência:

```typescript
// Padrão de uma rota GET de listagem
app.get('/api/praticantes', async (req, res) => {
    const praticantes = await prisma.praticante.findMany();
    res.json(praticantes);
});
```

---

## 🌐 4. Configuração de Portas e CORS

| Serviço | Porta | URL |
| :--- | :--- | :--- |
| **Frontend** (Vite) | `5173` | `http://localhost:5173` |
| **Backend** (Express) | `3000` | `http://localhost:3000` |

Como os dois rodam em origens diferentes, o backend usa `cors()` para liberar a comunicação:

```typescript
// backend/src/server.ts
import cors from 'cors';
app.use(cors()); // Aceita requisições de qualquer origem (modo dev)
```

Sem o `cors()`, o browser bloquearia as requisições do frontend com erro `CORS policy: No 'Access-Control-Allow-Origin'`.

---

## 📐 5. Contrato de Dados (Tipagem Compartilhada)

Os types do frontend em [`src/types/index.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/types/index.tsx) e os Models do Prisma em [`schema.prisma`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/backend/prisma/schema.prisma) devem ser mantidos sincronizados manualmente.

| Interface Frontend (TypeScript) | Model Backend (Prisma) |
| :--- | :--- |
| `ICavalo` | `model Cavalo` |
| `IPraticante` | `model Praticante` |
| `IEquoterapeuta` | `model Equoterapeuta` |

### Exemplo de Alinhamento

```typescript
// Frontend: src/types/index.tsx
export interface IPraticante {
    id?: number;
    nome: string;
    dataNascimento: string;
    diagnostico: string;
    nomeResponsavel: string;
    telefoneResponsavel: string;
    ativo?: boolean;
}
```

```prisma
// Backend: prisma/schema.prisma
model Praticante {
  id                  Int      @id @default(autoincrement())
  nome                String
  dataNascimento      String
  diagnostico         String
  nomeResponsavel     String
  telefoneResponsavel String
  ativo               Boolean  @default(true)
  createdAt           DateTime @default(now())
}
```

> [!IMPORTANT]
> Sempre que um campo for **adicionado, renomeado ou removido** do `schema.prisma`, a interface TypeScript correspondente no frontend **deve ser atualizada** para evitar erros silenciosos de tipagem ou falhas em runtime.

---

## 🔐 6. Autenticação (Estado Atual)

O frontend já possui a infraestrutura de autenticação implementada via Context API:

- [`authContext.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/contexts/authContext.tsx): Gerencia `user`, `token`, `isAuthenticated`, `login()` e `logout()`.
- [`useAuth.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/hooks/useAuth.tsx): Hook de conveniência para consumir o contexto.

```typescript
// O AuthContext suporta:
interface AuthContextData {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (token: string, userData: IUser) => void;
    logout: () => void;
    loading: boolean;
}
```

**Estado atual**: O `AuthProvider` está presente em [`App.tsx`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/frontend/src/App.tsx) mas a autenticação real (rota de login, validação de JWT, proteção de rotas) ainda **não está implementada** no backend.

**O que falta implementar para completar o fluxo:**

```
Frontend (pronto) ──► Backend (pendente)
─────────────────────────────────────────
POST /api/auth/login    ← Rota de login inexistente
GET  /api/auth/me       ← Rota de verificação de token inexistente

No api.ts: adicionar o token JWT no header Authorization
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

---

## 🗺️ 7. Mapa de Rotas Frontend → Backend

| Página | Rota React | Service Chamado | Endpoint Backend |
| :--- | :--- | :--- | :--- |
| `HomeMobile` | `/` | — | — |
| `AdminDashboard` | `/admin` | — | — |
| `CavaloList` | `/cavalos` | `CavaloService.listarTodos()` | `GET /api/cavalos` |
| `CavaloForm` (novo) | `/cavalos/novo` | `CavaloService.criar()` | `POST /api/cavalos` |
| `CavaloForm` (editar) | `/cavalos/editar/:id` | `CavaloService.buscarPorId()` + `.atualizar()` | `GET /api/cavalos/:id` + `PUT /api/cavalos/:id` ⚠️ |
| `PraticanteList` | `/praticantes` | `PraticanteService.listarTodos()` | `GET /api/praticantes` |
| `PraticanteForm` (novo) | `/praticantes/novo` | `PraticanteService.criar()` | `POST /api/praticantes` |
| `PraticanteForm` (editar) | `/praticantes/editar/:id` | `PraticanteService.buscarPorId()` + `.atualizar()` | `GET /api/praticantes/:id` ⚠️ + `PUT /api/praticantes/:id` ⚠️ |
| `EquoterapeutaList` | `/equoterapeutas` | `EquoterapeutaService.listarTodos()` | `GET /api/equoterapeutas` |
| `EquoterapeutaForm` (novo) | `/equoterapeutas/novo` | `EquoterapeutaService.criar()` | `POST /api/equoterapeutas` |
| `EquoterapeutaForm` (editar) | `/equoterapeutas/editar/:id` | `EquoterapeutaService.buscarPorId()` + `.atualizar()` | `GET /api/equoterapeutas/:id` ⚠️ + `PUT /api/equoterapeutas/:id` ⚠️ |

> ⚠️ = Rota existe no Service do frontend, mas **ainda não foi implementada** no `server.ts` do backend.

---

## 🚀 8. Como Rodar o Projeto Completo

Abra **dois terminais** separados:

**Terminal 1 — Backend:**
```bash
cd equitrack/backend
npm install
npx prisma generate
npm run dev
# ✅ API disponível em http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd equitrack/frontend
npm install
npm run dev
# ✅ App disponível em http://localhost:5173
```

> [!TIP]
> Na raiz do projeto há scripts npm no `README.md` que facilitam rodar os dois serviços. Você pode criar um `package.json` raiz com `concurrently` para rodar os dois com um único comando `npm run dev`.

---

## 🔮 9. Próximos Passos de Integração

Para expandir o sistema para múltiplos usuários e torná-lo pronto para produção:

- [ ] **Autenticação JWT**: Implementar `POST /api/auth/login` no backend e conectar com o `AuthContext` do frontend.
- [ ] **Proteção de Rotas**: Criar rotas privadas no React Router que redirecionam para login se não autenticado.
- [ ] **Rotas PUT/DELETE faltantes**: Implementar as rotas de atualização e exclusão em todas as entidades.
- [ ] **Validação de dados**: Usar `zod` no backend para validar os bodies antes de persistir no banco.
- [ ] **Paginação**: Adicionar suporte a paginação nas rotas de listagem (parâmetros `page` e `limit`).
- [ ] **Variável de ambiente no Frontend**: Mover `http://localhost:3000/api` para uma variável `VITE_API_URL` no arquivo `.env` do frontend.
