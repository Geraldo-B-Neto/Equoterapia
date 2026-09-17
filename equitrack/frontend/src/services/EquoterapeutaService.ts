import { api } from './api';
import { IEquoterapeuta } from '../types';

export const EquoterapeutaService = {
    listarTodos: async (): Promise<IEquoterapeuta[]> => {
        const { data } = await api.get<IEquoterapeuta[]>('/equoterapeutas');
        return data;
    },

    buscarPorId: async (id: number): Promise<IEquoterapeuta> => {
        const { data } = await api.get<IEquoterapeuta>(`/equoterapeutas/${id}`);
        return data;
    },

    criar: async (equoterapeuta: IEquoterapeuta): Promise<IEquoterapeuta> => {
        const { data } = await api.post<IEquoterapeuta>('/equoterapeutas', equoterapeuta);
        return data;
    },

    atualizar: async (id: number, equoterapeuta: IEquoterapeuta): Promise<IEquoterapeuta> => {
        const { data } = await api.put<IEquoterapeuta>(`/equoterapeutas/${id}`, equoterapeuta);
        return data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/equoterapeutas/${id}`);
    },
};