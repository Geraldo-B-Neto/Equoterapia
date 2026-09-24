# ⚙️ Manual do Backend — EquiTrack

Este documento detalha a arquitetura, dependências, banco de dados e convenções do servidor backend do **EquiTrack**. É o ponto de partida obrigatório para qualquer desenvolvedor que for trabalhar na API.

---

## 📌 1. Visão Geral da Stack do Backend

O backend é uma **API REST** construída sobre Node.js com TypeScript, usando Express como framework HTTP e Prisma como ORM para acesso ao banco de dados.

| Tecnologia | Versão | Finalidade |
| :--- | :--- | :--- |
| **Node.js** | `>=18` | Runtime JavaScript server-side |
| **TypeScript** | `^7.0.2` | Tipagem estática para maior segurança no código |
| **tsx** | `^4.23.13` | Executor de TypeScript em desenvolvimento (sem precisar compilar) |
| **Express** | `^5.2.1` | Framework web minimalista para definição de rotas e middleware |
| **Prisma ORM** | `^5.22.0` | Mapeamento objeto-relacional com banco de dados SQLite |
| **@prisma/client** | `^5.22.0` | Cliente gerado pelo Prisma para queries tipadas |
| **CORS** | `^2.8.6` | Middleware que libera o acesso da origem do frontend |
| **dotenv** | `^17.4.2` | Leitura de variáveis de ambiente do arquivo `.env` |

---

## 🗂️ 2. Árvore de Diretórios do Backend

```text
equitrack/backend/
├── prisma/                        # Tudo relacionado ao banco de dados
│   ├── schema.prisma              # Definição dos modelos e conexão com o banco
│   ├── dev.db                     # Banco de dados SQLite (ambiente de desenvolvimento)
│   ├── equitrack_database.db      # Banco de dados SQLite alternativo/produção
│   └── migrations/                # Histórico de migrações do banco de dados
│       ├── migration_lock.toml    # Lockfile do Prisma para controle de versão das migrações
│       └── 20260902152729_init/
│           └── migration.sql      # Script SQL da migração inicial (criação das tabelas)
│
├── src/
│   └── server.ts                  # Arquivo principal: configuração do app e todas as rotas
│
├── .env                           # Variáveis de ambiente (URL do banco, segredos)
├── .gitignore                     # Arquivos ignorados pelo Git (node_modules, .env, etc.)
├── package.json                   # Dependências e scripts npm
└── tsconfig.json                  # Configurações do compilador TypeScript
```

---

## 📦 3. Dependências em Detalhe

### Dependências de Produção (`dependencies`)

#### `express` — Framework HTTP
O núcleo da API. Responsável por receber requisições HTTP e direcionar para as funções de cada rota.
```typescript
import express from 'express';
const app = express();
app.listen(3000, () => console.log('Servidor rodando!'));
```

#### `@prisma/client` — Cliente do Banco de Dados
Gerado automaticamente pelo comando `prisma generate` com base no [`schema.prisma`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/backend/prisma/schema.prisma). Oferece métodos tipados como `findMany`, `create`, `update`, `delete`.
```typescript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const cavalos = await prisma.cavalo.findMany();
```

> [!IMPORTANT]
> Sempre que o `schema.prisma` for modificado, execute `npx prisma generate` para atualizar o cliente e `npx prisma migrate dev --name <descricao>` para aplicar as mudanças ao banco.

#### `cors` — Cross-Origin Resource Sharing
Libera o acesso ao servidor a partir de outros domínios/portas. **Essencial** para que o frontend (porta `5173`) consiga falar com o backend (porta `3000`).
```typescript
import cors from 'cors';
app.use(cors()); // libera todas as origens (desenvolvimento)
```

> [!WARNING]
> Em produção, configure o `cors` com origens específicas: `app.use(cors({ origin: 'https://seu-dominio.com' }))` para evitar vulnerabilidades de segurança.

#### `dotenv` — Variáveis de Ambiente
Carrega o arquivo [`.env`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/backend/.env) para `process.env`. Garante que configurações sensíveis (como URLs de banco de dados) não fiquem no código-fonte.

---

### Dependências de Desenvolvimento (`devDependencies`)

#### `tsx` — Executor TypeScript (Hot Reload)
Permite rodar arquivos `.ts` diretamente sem um passo de compilação, com suporte a hot-reload via `tsx watch`.
```json
"scripts": {
    "dev": "tsx watch src/server.ts"
}
```

#### `typescript` — Compilador TypeScript
Valida os tipos em tempo de build e oferece o ambiente tipado da linguagem.

#### `@types/express`, `@types/cors`, `@types/node` — Tipos das Bibliotecas
Pacotes de definição de tipos para que o TypeScript entenda as assinaturas de Express, CORS e Node.js.

#### `ts-node` / `ts-node-dev`
Executores alternativos de TypeScript. Atualmente o projeto usa `tsx`, que é mais moderno e rápido.

---

## 🗄️ 4. Banco de Dados e Prisma

### `prisma/schema.prisma` — Schema Central
O arquivo [`schema.prisma`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/backend/prisma/schema.prisma) é a **fonte da verdade** do banco de dados. Define:

1. **Datasource**: Provedor (`sqlite`) e caminho do arquivo do banco.
2. **Generator**: Qual cliente será gerado (`prisma-client-js`).
3. **Models**: As entidades/tabelas do sistema.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}
```

### Modelos Atuais

| Model | Campos | Descrição |
| :--- | :--- | :--- |
| `Cavalo` | `id, nome, raca, ativo, createdAt` | Cavalos disponíveis para a equoterapia |
| `Praticante` | `id, nome, dataNascimento, diagnostico, nomeResponsavel, telefoneResponsavel, ativo, createdAt` | Pacientes que praticam equoterapia |
| `Equoterapeuta` | `id, nome, especialidade, registroProfissional, telefone, ativo, createdAt` | Profissionais terapeutas responsáveis pelas sessões |

### Tabela `migration_lock.toml`
Controla qual provedor de banco está em uso e previne conflitos entre migrações de diferentes provedores. **Não edite manualmente.**

### Comandos Prisma Mais Utilizados

```bash
# Criar e aplicar uma nova migração ao banco
npx prisma migrate dev --name <nome_descritivo>

# Gerar/atualizar o Prisma Client após mudanças no schema
npx prisma generate

# Abrir interface visual para inspecionar o banco de dados
npx prisma studio

# Verificar o status das migrações
npx prisma migrate status

# Resetar o banco (CUIDADO: apaga todos os dados!)
npx prisma migrate reset
```

---

## 🚏 5. Rotas da API REST

Todo o servidor está centralizado em [`src/server.ts`](file:///c:/Users/geral/Desktop/Dev/EQUOFORM/equitrack/backend/src/server.ts).

### 🐴 Cavalos — `/api/cavalos`

| Método | Endpoint | Descrição | Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cavalos` | Lista todos os cavalos | — |
| `GET` | `/api/cavalos/:id` | Busca um cavalo pelo ID | — |
| `POST` | `/api/cavalos` | Cria um novo cavalo | `{ nome, raca, ativo }` |
| `DELETE` | `/api/cavalos/:id` | Remove um cavalo pelo ID | — |

### 🧑 Praticantes — `/api/praticantes`

| Método | Endpoint | Descrição | Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/praticantes` | Lista todos os praticantes | — |
| `POST` | `/api/praticantes` | Cria um novo praticante | `{ nome, dataNascimento, diagnostico, nomeResponsavel, telefoneResponsavel }` |

### 👩‍⚕️ Equoterapeutas — `/api/equoterapeutas`

| Método | Endpoint | Descrição | Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/equoterapeutas` | Lista todos os equoterapeutas | — |
| `POST` | `/api/equoterapeutas` | Cria um novo equoterapeuta | `{ nome, especialidade, registroProfissional, telefone }` |

> [!NOTE]
> Endpoints de `PUT` (editar) e `DELETE` para praticantes e equoterapeutas já existem nos Services do frontend, mas ainda **precisam ser implementados** no `server.ts` do backend.

---

## ⚙️ 6. Configurações de Compilação (TypeScript)

[`tsconfig.json`](file:///c:/Users/geral/Desktop\Dev\EQUOFORM\equitrack\backend\tsconfig.json):

```json
{
  "compilerOptions": {
    "target": "ES2022",        // ECMAScript gerado para Node moderno
    "module": "commonjs",      // Sistema de módulos compatível com Node.js
    "moduleResolution": "node",
    "esModuleInterop": true,   // Permite import default de módulos CommonJS
    "strict": true,            // Ativa checagens rigorosas de tipo
    "outDir": "./dist",        // Pasta de saída do build compilado
    "rootDir": "./src"         // Pasta de origem do TypeScript
  }
}
```

---

## 🚀 7. Como Rodar o Backend Localmente

```bash
cd equitrack/backend

# 1. Instalar dependências
npm install

# 2. Gerar o Prisma Client (necessário após clone ou mudanças no schema)
npx prisma generate

# 3. Rodar o servidor em modo de desenvolvimento (com hot-reload)
npm run dev
```
> O servidor iniciará em `http://localhost:3000`

---

## 📋 8. Checklist de Gaps Atuais

Os itens abaixo existem no frontend mas ainda estão **ausentes no backend** e devem ser implementados na próxima fase:

- [ ] `PUT /api/praticantes/:id` — Atualizar praticante
- [ ] `DELETE /api/praticantes/:id` — Excluir praticante
- [ ] `PUT /api/cavalos/:id` — Atualizar cavalo
- [ ] `PUT /api/equoterapeutas/:id` — Atualizar equoterapeuta
- [ ] `DELETE /api/equoterapeutas/:id` — Excluir equoterapeuta
- [ ] Tratamento de erros padronizado (middleware global de error handling)
- [ ] Autenticação JWT (o `AuthContext` no frontend já está preparado para receber token)
- [ ] Validação de body das requisições (ex: Zod ou Joi)
- [ ] Separação do `server.ts` em `routes/`, `controllers/` e `services/` à medida que crescer
