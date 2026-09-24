import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityListLayout } from '../../../components/layout/EntityListLayout/EntityListLayout';
import { EquoterapeutaCard } from "../../../components/cards/EquoterapeutaCard";
import { EquoterapeutaService } from '../../../services/EquoterapeutaService';
import { IEquoterapeuta } from '../../../types';
import { Header } from '../../../components/layout/Header/Header';

export const EquoterapeutaList: React.FC = () => {
    const [equoterapeutas, setEquoterapeutas] = useState<IEquoterapeuta[]>([]);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        EquoterapeutaService.listarTodos()
            .then((data) => setEquoterapeutas(data || []))
            .catch((err) => console.error('Erro ao buscar equoterapeutas:', err));
    }, []);

    // Filtro de busca por nome ou especialidade
    const equoterapeutasFiltrados = equoterapeutas.filter((p) =>
        p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        p.especialidade?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <>
            <Header title="Gestão de Equoterapeutas" showBackButton={true} />

            <EntityListLayout
                tituloBotaoTopo="+ Cadastrar Equoterapeuta"
                onNovoClick={() => navigate('/equoterapeutas/novo')}
                tituloSecao="Equoterapeutas"
                placeholderBusca="Busque por equoterapeutas..."
                onBuscaChange={(termo) => setBusca(termo)}
            >
                {equoterapeutasFiltrados.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
                        Nenhum equoterapeuta encontrado.
                    </p>
                ) : (
                    equoterapeutasFiltrados.map((equoterapeuta) => (
                        <EquoterapeutaCard
                            key={equoterapeuta.id}
                            statusText={equoterapeuta.ativo ? 'Status: Ativo' : 'Status: Inativo'}
                            isStatusActive={equoterapeuta.ativo}
                            title={equoterapeuta.nome}
                            info1={`🩺 Especialidade: ${equoterapeuta.especialidade || 'Não informada'}`}
                            info2={`📋 Registro: ${equoterapeuta.registroProfissional || 'Não informado'}`}
                            actionText="Ver / Editar cadastro >"
                            onActionClick={() => navigate(`/equoterapeutas/editar/${equoterapeuta.id}`)}
                            onWhatsAppClick={() => {
                                if (equoterapeuta.telefone) {
                                    window.open(`https://wa.me/55${equoterapeuta.telefone.replace(/\D/g, '')}`, '_blank');
                                } else {
                                    navigate(`/equoterapeutas/editar/${equoterapeuta.id}`);
                                }
                            }}
                        />
                    ))
                )}
            </EntityListLayout>
        </>
    );
};