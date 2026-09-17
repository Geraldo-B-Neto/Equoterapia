// src/types/index.ts

export interface ICavalo {
    id?: number;
    nome: string;
    raca: string;
    idade?: number;
    caracteristicas?: string;
    ativo?: boolean;
}

export interface IPraticante {
    id?: number;
    nome: string;
    dataNascimento: string;

    diagnostico: string;
    nomeResponsavel: string;
    telefoneResponsavel: string;
    ativo?: boolean;
}

export interface IEquoterapeuta {
    id?: number;
    nome: string;
    especialidade: string;
    registroProfissional: string;
    telefone: string;
    ativo?: boolean;
}
