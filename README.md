
# 🐴 EquiTrack - Sistema de Gestão de Equoterapia

Sistema completo para gerenciamento de cavalos, praticantes e equoterapeutas.

---

## 🚀 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Git](https://git-scm.com/)

---

## 🛠️ Como Baixar e Executar o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/equitrack.git
cd equitrack

```

### 2. Instalar Dependências e Configurar o Banco de Dados

Execute o comando de setup na raiz. Ele instalará os pacotes do Backend e do Frontend, além de gerar o banco SQLite via Prisma:

```bash
npm run setup

```

---

## 💻 Executando a Aplicação

Para rodar os serviços, abra dois terminais na raiz do projeto:

* **Terminal 1 (Backend - API REST):**
```bash
npm run dev:backend

```


> O servidor iniciará em `http://localhost:3000`


* **Terminal 2 (Frontend - React):**
```bash
npm run dev:frontend

```


> O aplicativo web abrirá em `http://localhost:5173`



---

## 📦 Stack Utilizada

* **Frontend:** React, TypeScript, Vite, React Router, Axios
* **Backend:** Node.js, Express, Prisma ORM, SQLite

```

```