// src/pages/EquoterapeutaForm/EquoterapeutaForm.tsx
import React, { useState } from 'react';
import { Header } from '../../../components/layout/Header/Header';
import { Input } from '../../../components/ui/Input/Input';
import { Button } from '../../../components/ui/Button/Button';
import { Divider } from '../../../components/ui/Divider/Divider';
import { EquoterapeutaService } from '../../../services/EquoterapeutaService';
import { IEquoterapeuta } from '../../../types';

import styles from './EquoterapeutaForm.module.css';

export const EquoterapeutaForm: React.FC = () => {
    const [formData, setFormData] = useState<IEquoterapeuta>({
        nome: '',
        especialidade: '',
        registroProfissional: '',
        telefone: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await EquoterapeutaService.criar(formData);
            alert('Equoterapeuta cadastrado com sucesso!');
            setFormData({
                nome: '',
                especialidade: '',
                registroProfissional: '',
                telefone: '',
            });
        } catch (error) {
            console.error('Erro ao salvar equoterapeuta:', error);
            alert('Erro ao salvar no servidor. Verifique a conexão com a API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <section className={styles.containerDadosEquoterapeuta}>
                        <h1>Dados do Equoterapeuta</h1>

                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <div className={styles.dadosEquoterapeuta}>
                            <div className={styles.containerBoxImgEquoterapeuta}>
                                <div className={styles.boxImgEquoterapeuta}></div>
                                <Button variant="ghost" type="button">
                                    Adicionar Foto
                                </Button>
                                <Divider width="large" backgroundColor="corDourada" />
                            </div>

                            <div className={styles.containerBoxInputs}>
                                <Input
                                    id="nomeEquoterapeuta"
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Nome Completo"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="especialidade"
                                    label="Especialidade / Profissão"
                                    type="text"
                                    placeholder="Ex: Fisioterapeuta, Psicólogo(a)"
                                    name="especialidade"
                                    value={formData.especialidade}
                                    onChange={handleChange}
                                />

                                <Divider width="small" backgroundColor="corDourada" />

                                <Input
                                    id="registroProfissional"
                                    label="Registro Profissional (CREFITO, CRP, etc.)"
                                    type="text"
                                    placeholder="Número do registro"
                                    name="registroProfissional"
                                    value={formData.registroProfissional}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="telefoneEquoterapeuta"
                                    label="Telefone"
                                    type="tel"
                                    placeholder="Telefone de contato"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                />

                                <Divider width="small" backgroundColor="corDourada" />
                            </div>
                        </div>

                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <Button variant="primary" size="lg" type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Equoterapeuta'}
                        </Button>
                    </section>
                </form>
            </main>
        </>
    );
};