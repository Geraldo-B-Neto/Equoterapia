import { api } from './api';
import { IPraticante } from '../types';

export const PraticanteService = {
    listarTodos: async (): Promise<IPraticante[]> => {
        const { data } = await api.get<IPraticante[]>('/praticantes');
        return data;
    },

    buscarPorId: async (id: number): Promise<IPraticante> => {
        const { data } = await api.get<IPraticante>(`/praticantes/${id}`);
        return data;
    },

    criar: async (praticante: IPraticante): Promise<IPraticante> => {
        const { data } = await api.post<IPraticante>('/praticantes', praticante);
        return data;
    },

    atualizar: async (id: number, praticante: IPraticante): Promise<IPraticante> => {
        const { data } = await api.put<IPraticante>(`/praticantes/${id}`, praticante);
        return data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/praticantes/${id}`);
    },
};