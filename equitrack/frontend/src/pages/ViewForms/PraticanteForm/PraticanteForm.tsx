// src/pages/PraticanteForm/PraticanteForm.tsx
import React, { useState } from 'react';
import { Header } from '../../../components/layout/Header/Header';
import { Input } from '../../../components/ui/Input/Input';
import { TextArea } from '../../../components/ui/TextArea/TextArea';
import { Button } from '../../../components/ui/Button/Button';
import { Divider } from '../../../components/ui/Divider/Divider';
import { PraticanteService } from '../../../services/PraticanteService';
import { IPraticante } from '../../../types';

import styles from './PraticanteForm.module.css';

export const PraticanteForm: React.FC = () => {
    const [formData, setFormData] = useState<IPraticante>({
        nome: '',
        dataNascimento: '',
        diagnostico: '',
        nomeResponsavel: '',
        telefoneResponsavel: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await PraticanteService.criar(formData);
            alert('Praticante cadastrado com sucesso!');
            setFormData({
                nome: '',
                dataNascimento: '',
                diagnostico: '',
                nomeResponsavel: '',
                telefoneResponsavel: '',
            });
        } catch (error) {
            console.error('Erro ao salvar praticante:', error);
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
                    {/* SEÇÃO: DADOS DO PRATICANTE */}
                    <section className={styles.containerDadosPraticantes}>
                        <h1>Dados do Praticante</h1>

                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <div className={styles.dadosPraticantes}>
                            <div className={styles.containerBoxImgPraticante}>
                                <div className={styles.boxImgPraticante}></div>
                                <Button variant="ghost" type="button">
                                    Adicionar Foto
                                </Button>

                                <Divider width="large" backgroundColor="corDourada" />
                            </div>

                            <div className={styles.containerBoxInputs}>
                                <Input
                                    id="nomePraticante"
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Nome Completo"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                />

                                <Input
                                    id="dataNascimento"
                                    label="Data de Nascimento"
                                    type="date"
                                    name="dataNascimento"
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                />

                                <Divider width="small" backgroundColor="corDourada" />

                                <TextArea
                                    id="diagnostico"
                                    label="Diagnóstico / Observações:"
                                    name="diagnostico"
                                    rows={4}
                                    value={formData.diagnostico}
                                    onChange={handleChange}
                                />

                                <Divider width="small" backgroundColor="corDourada" />
                            </div>
                        </div>
                    </section>

                    {/* SEÇÃO: DADOS DO RESPONSÁVEL */}
                    <section className={styles.containerDadosResponsavel}>
                        <h1>Dados do Responsável</h1>

                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <div className={styles.containerBoxInputs}>
                            <Input
                                id="nomeResponsavel"
                                label="Nome Completo"
                                type="text"
                                placeholder="Nome Completo"
                                name="nomeResponsavel"
                                value={formData.nomeResponsavel}
                                onChange={handleChange}
                            />

                            <Input
                                id="telefoneResponsavel"
                                label="Telefone"
                                type="tel"
                                placeholder="Telefone"
                                name="telefoneResponsavel"
                                value={formData.telefoneResponsavel}
                                onChange={handleChange}
                            />
                        </div>

                        <Divider width="small" backgroundColor="corDourada" />
                        <Divider width="large" backgroundColor="corVerdeEscuro" />

                        <Button variant="primary" size="lg" type="submit" disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Praticante'}
                        </Button>
                    </section>
                </form>
            </main>
        </>
    );
};