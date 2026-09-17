// src/pages/CavaloForm/CavaloForm.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../../components/layout/Header/Header';
import { Footer } from '../../../components/layout/Footer/Footer';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Divider } from '../../../components/ui/Divider/Divider';
import { CavaloService } from '../../../services/CavaloService';
import { ICavalo } from '../../../types';

import styles from './CavaloForm.module.css';

export const CavaloForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState<ICavalo>({
        nome: '',
        raca: '',
        ativo: true,
    });

    const [loading, setLoading] = useState(false);

    // Se houver ID na URL, busca os dados para preencher o formulário
    useEffect(() => {
        if (isEditing && id) {
            const carregarCavalo = async () => {
                try {
                    setLoading(true);
                    const data = await CavaloService.buscarPorId(Number(id));
                    setFormData(data);
                } catch (error) {
                    console.error('Erro ao carregar dados do cavalo:', error);
                    alert('Erro ao carregar dados para edição.');
                } finally {
                    setLoading(false);
                }
            };

            carregarCavalo();
        }
    }, [id, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleStatus = () => {
        setFormData((prev) => ({ ...prev, ativo: !prev.ativo }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await CavaloService.atualizar(Number(id), formData);
                alert('Cavalo atualizado com sucesso!');
            } else {
                await CavaloService.criar(formData);
                alert('Cavalo cadastrado com sucesso!');
            }
            navigate('/cavalos'); // Redireciona para a lista após salvar
        } catch (error) {
            console.error('Erro ao salvar cavalo:', error);
            alert('Erro ao salvar no servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <section className={styles.containerDadosCavalos}>
                        <h1>{isEditing ? 'Editar Cavalo' : 'Dados do Cavalo'}</h1>

                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <div className={styles.dadosCavalos}>
                            <div className={styles.containerBoxImgCavalo}>
                                <div className={styles.boxImgCavalo}></div>
                                <Button variant="ghost" type="button">
                                    {isEditing ? 'Alterar Foto' : 'Adicionar Foto'}
                                </Button>
                                <Divider width="large" backgroundColor="corDourada" />
                            </div>

                            <div className={styles.containerBoxInputs}>
                                <Input
                                    id="nomeCavalo"
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Nome Completo"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="raca"
                                    label="Raça"
                                    type="text"
                                    placeholder="Raça"
                                    name="raca"
                                    value={formData.raca}
                                    onChange={handleChange}
                                />

                                <Divider width="small" backgroundColor="corDourada" />

                                <div className={styles.statusRow}>
                                    <span>Status :</span>
                                    <button
                                        type="button"
                                        className={`${styles.statusBadge} ${formData.ativo ? styles.ativo : styles.inativo}`}
                                        onClick={toggleStatus}
                                    >
                                        {formData.ativo ? 'Disponível' : 'Indisponível'}
                                    </button>
                                </div>
                            </div>

                            <Divider width="small" backgroundColor="corDourada" />
                            <Divider width="large" backgroundColor="corVerdeEscuro" />

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Button variant="primary" size="lg" type="submit" disabled={loading}>
                                    {loading ? 'Salvar...' : isEditing ? 'Atualizar Cavalo' : 'Salvar Cavalo'}
                                </Button>
                                <Button variant="ghost" size="lg" type="button" onClick={() => navigate('/cavalos')}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </section>
                </form>
            </main>
            <Footer />
        </>
    );
};