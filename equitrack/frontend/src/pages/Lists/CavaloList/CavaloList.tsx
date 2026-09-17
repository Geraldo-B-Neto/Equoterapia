// src/pages/CavaloList/CavaloList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/layout/Header/Header';
import { Button } from '../../../components/ui/Button/Button';
import { CavaloService } from '../../../services/CavaloService';
import { ICavalo } from '../../../types';

import styles from './CavaloList.module.css';

export const CavaloList: React.FC = () => {
    const [cavalos, setCavalos] = useState<ICavalo[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const carregarCavalos = async () => {
        try {
            setLoading(true);
            const data = await CavaloService.listarTodos();
            setCavalos(data);
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarCavalos();
    }, []);

    const handleDeletar = async (id?: number) => {
        if (!id) return;
        if (window.confirm('Confirma a exclusão deste cavalo?')) {
            try {
                await CavaloService.deletar(id);
                setCavalos((prev) => prev.filter((c) => c.id !== id));
            } catch (error) {
                alert('Erro ao excluir no servidor.');
            }
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.headerContainer}>
                    <h1>Cavalos Cadastrados</h1>
                    <Button variant="primary" onClick={() => navigate('/cavalos/novo')}>
                        + Cadastrar Cavalo
                    </Button>
                </div>

                {loading ? (
                    <p>Carregando dados do servidor...</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Raça</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cavalos.map((cavalo) => (
                                <tr key={cavalo.id}>
                                    <td>{cavalo.nome}</td>
                                    <td>{cavalo.raca}</td>
                                    <td>{cavalo.ativo ? 'Disponível' : 'Indisponível'}</td>
                                    <td>
                                        <Button variant="ghost" onClick={() => navigate(`/cavalos/editar/${cavalo.id}`)}>
                                            Editar
                                        </Button>
                                        <Button variant="primary" onClick={() => handleDeletar(cavalo.id)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {cavalos.length === 0 && (
                                <tr>
                                    <td colSpan={4}>Nenhum cavalo encontrado no banco.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </main>
        </>
    );
};