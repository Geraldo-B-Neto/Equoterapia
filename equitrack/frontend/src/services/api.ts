// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            console.error('Erro de Rede / API Indisponível:', error.message);
        } else {
            console.error(`Erro ${error.response.status}:`, error.response.data);
        }
        return Promise.reject(error);
    }
);