-- CreateTable
CREATE TABLE "Cavalo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Praticante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataNascimento" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "telefoneResponsavel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Equoterapeuta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "registroProfissional" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
