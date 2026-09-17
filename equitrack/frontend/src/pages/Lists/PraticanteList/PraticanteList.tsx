import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityListLayout } from '../../../components/layout/EntityListLayout/EntityListLayout';
import { PraticanteCard } from "../../../components/cards/PraticanteCard/PraticanteCard";
import { PraticanteService } from '../../../services/PraticanteService';
import { IPraticante } from '../../../types';
import { Header } from '../../../components/layout/Header/Header';

export const PraticanteList: React.FC = () => {
    const [praticantes, setPraticantes] = useState<IPraticante[]>([]);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        PraticanteService.listarTodos()
            .then((data) => setPraticantes(data || []))
            .catch((err) => console.error('Erro ao buscar praticantes:', err));
    }, []);

    // Filtro de busca com verificação de segurança (optional chaining)
    const praticantesFiltrados = praticantes.filter((p) =>
        p.nome?.toLowerCase().includes(busca.toLowerCase())
    );

    return (

        <>
            <Header title={"Gestão de Praticantes"} showBackButton={true} />

            <EntityListLayout
                tituloBotaoTopo="+ Cadastrar Praticante"
                onNovoClick={() => navigate('/praticantes/novo')}
                tituloSecao="Praticantes"
                placeholderBusca="Busque por praticantes..."
                onBuscaChange={(termo) => setBusca(termo)}
            >
                {praticantesFiltrados.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
                        Nenhum praticante encontrado.
                    </p>
                ) : (
                    praticantesFiltrados.map((praticante) => (
                        <PraticanteCard
                            key={praticante.id}
                            statusText={praticante.ativo ? 'Status: Ativo' : 'Status: Inativo'}
                            isStatusActive={praticante.ativo}
                            title={praticante.nome}
                            info1={`📋 ${praticante.dataNascimento} x anos` || 'idade não informada'}
                            actionText="Ver / Editar cadastro >"
                            onActionClick={() => navigate(`/praticantes/editar/${praticante.id}`)}
                        />
                    ))
                )}
            </EntityListLayout>
        </>



    );
};