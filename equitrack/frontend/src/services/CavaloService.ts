import { api } from './api';
import { ICavalo } from '../types';

export const CavaloService = {
    listarTodos: async (): Promise<ICavalo[]> => {
        const { data } = await api.get<ICavalo[]>('/cavalos');
        return data;
    },

    buscarPorId: async (id: number): Promise<ICavalo> => {
        const { data } = await api.get<ICavalo>(`/cavalos/${id}`);
        return data;
    },

    criar: async (cavalo: ICavalo): Promise<ICavalo> => {
        const { data } = await api.post<ICavalo>('/cavalos', cavalo);
        return data;
    },

    atualizar: async (id: number, cavalo: ICavalo): Promise<ICavalo> => {
        const { data } = await api.put<ICavalo>(`/cavalos/${id}`, cavalo);
        return data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/cavalos/${id}`);
    },
};