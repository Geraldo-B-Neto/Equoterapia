import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define a estrutura do Usuário
export interface IUser {
    id: string;
    nome: string;
    email: string;
    avatarUrl?: string;
    role: 'ADMIN' | 'USER'; // Ou eAdmin: boolean
}

// Define o que o contexto vai disponibilizar para o projeto
interface AuthContextData {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (token: string, userData: IUser) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Ao carregar o app, verifica se já existe token e usuário salvos
    useEffect(() => {
        const storedUser = localStorage.getItem('@EquiTrack:user');
        const storedToken = localStorage.getItem('@EquiTrack:token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (token: string, userData: IUser) => {
        localStorage.setItem('@EquiTrack:token', token);
        localStorage.setItem('@EquiTrack:user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('@EquiTrack:token');
        localStorage.removeItem('@EquiTrack:user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};