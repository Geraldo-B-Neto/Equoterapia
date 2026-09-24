# 🐴 EquiTrack — O que é este projeto?

> Este documento foi escrito para qualquer pessoa entender o que é o EquiTrack, mesmo quem nunca teve contato com tecnologia ou programação.

---

## 💡 A Ideia

Imagine uma clínica ou centro de equoterapia onde todo dia acontecem sessões com cavalos, pacientes e terapeutas. Hoje, muita coisa é anotada em papel, em cadernos ou em planilhas espalhadas — e quando alguém precisa de uma informação, fica difícil achar.

**O EquiTrack existe para resolver isso.**

É um sistema feito especialmente para centros de equoterapia, onde tudo fica organizado em um único lugar, acessível pelo celular ou computador.

---

## 🐎 O que é Equoterapia?

Equoterapia é uma forma de tratamento e reabilitação que usa o cavalo como parte da terapia. É indicada para pessoas com necessidades especiais, deficiências físicas ou transtornos do desenvolvimento (como autismo, paralisia cerebral, entre outros). Durante as sessões, o paciente interage com o cavalo guiado por um terapeuta especializado.

---

## ✅ O que o EquiTrack faz?

O sistema permite que os responsáveis pelo centro de equoterapia gerenciem três partes principais:

### 🧑 Praticantes (os pacientes)
Cada pessoa que faz equoterapia é chamada de **praticante**. O sistema guarda informações importantes como:
- Nome completo
- Data de nascimento
- Diagnóstico médico / observações
- Nome e telefone do responsável (pai, mãe ou tutor)

Com o EquiTrack, é possível **cadastrar novos praticantes**, visualizar todos os que já estão no sistema e editar informações quando necessário.

---

### 🐴 Cavalos
Os cavalos também precisam de cadastro! O sistema armazena:
- Nome do cavalo
- Raça
- Se está ativo (disponível para sessões) ou não

Isso ajuda a saber quais cavalos estão disponíveis em cada momento.

---

### 👩‍⚕️ Equoterapeutas (os terapeutas)
Os profissionais que conduzem as sessões também são cadastrados:
- Nome
- Especialidade
- Número de registro profissional
- Telefone de contato

---

## 📱 Como as pessoas usam o EquiTrack?

O sistema funciona como um **site que abre no celular ou no computador** — não precisa baixar nada. Basta acessar pelo navegador (como Google Chrome, Safari ou Firefox).

A tela inicial mostra os atalhos principais e, a partir daí, é possível navegar entre as listas de praticantes, cavalos e terapeutas, ou abrir o painel administrativo.

---

## 👥 Para quem é o EquiTrack?

| Usuário | Como usa o sistema |
| :--- | :--- |
| **Coordenador / Administrador** | Cadastra novos praticantes, cavalos e terapeutas. Vê todos os registros. |
| **Equoterapeuta** | Consulta informações dos praticantes e cavalos antes das sessões. |
| **Secretaria / Recepção** | Registra novos pacientes e mantém os dados atualizados. |

---

## 🔒 É seguro?

O sistema foi desenvolvido com uma área de **login e controle de acesso**, ou seja, só pessoas autorizadas conseguem entrar e ver as informações. Os dados dos pacientes ficam armazenados de forma organizada e protegida.

---

## 🚀 Qual é o estado atual do projeto?

O EquiTrack está em **desenvolvimento ativo**. Já funciona o básico:

- ✅ Cadastro e listagem de praticantes
- ✅ Cadastro e listagem de cavalos
- ✅ Cadastro e listagem de equoterapeutas
- ✅ Busca por nome dentro de cada lista
- ✅ Banco de dados funcionando e salvando as informações

Ainda está sendo construído:
- 🔜 Edição e exclusão de registros
- 🔜 Tela de login com senha
- 🔜 Registro e histórico de sessões
- 🔜 Relatórios e estatísticas

---

## 🛠️ Quem fez e como funciona por baixo?

> *Esta parte é opcional — só leia se tiver curiosidade!*

O EquiTrack é dividido em duas partes que trabalham juntas:

- **A parte que você vê** (o site) foi feita com uma tecnologia chamada React — basicamente um conjunto de "peças" que formam as telas.
- **A parte que guarda os dados** (o servidor) foi feita com Node.js e usa um banco de dados simples chamado SQLite para armazenar todas as informações com segurança.

As duas partes se comunicam pela internet, como quando você pesquisa algo no Google: você digita, a pergunta vai para os servidores do Google, e a resposta volta para a sua tela.

---

*Projeto desenvolvido para apoiar centros de equoterapia na organização e gestão dos seus atendimentos.* 🐴
