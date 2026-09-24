import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityListLayout } from '../../../components/layout/EntityListLayout/EntityListLayout';
import { CavaloCard } from '../../../components/cards/CavaloCard';
import { CavaloService } from '../../../services/CavaloService';
import { ICavalo } from '../../../types';
import { Header } from '../../../components/layout/Header/Header';

export const CavaloList: React.FC = () => {
    const [cavalos, setCavalos] = useState<ICavalo[]>([]);
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        CavaloService.listarTodos()
            .then((data) => setCavalos(data || []))
            .catch((err) => console.error('Erro ao buscar cavalos:', err));
    }, []);

    // Filtro de busca por nome ou raça
    const cavalosFiltrados = cavalos.filter((c) =>
        c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        c.raca?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <>
            <Header title="Gestão de Cavalos" showBackButton={true} />

            <EntityListLayout
                tituloBotaoTopo="+ Cadastrar Cavalo"
                onNovoClick={() => navigate('/cavalos/novo')}
                tituloSecao="Cavalos"
                placeholderBusca="Busque por cavalos..."
                onBuscaChange={(termo) => setBusca(termo)}
            >
                {cavalosFiltrados.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
                        Nenhum cavalo encontrado.
                    </p>
                ) : (
                    cavalosFiltrados.map((cavalo) => (
                        <CavaloCard
                            key={cavalo.id}
                            statusText={cavalo.ativo ? 'Status: Ativo' : 'Status: Inativo'}
                            isStatusActive={cavalo.ativo}
                            title={cavalo.nome}
                            info1={`🐴 Raça: ${cavalo.raca || 'Não informada'}`}
                            info2={`🎂 Idade: ${cavalo.idade ? `${cavalo.idade} anos` : 'Não informada'}`}
                            actionText="Ver / Editar cadastro >"
                            onActionClick={() => navigate(`/cavalos/editar/${cavalo.id}`)}
                            onEditClick={() => navigate(`/cavalos/editar/${cavalo.id}`)}
                        />
                    ))
                )}
            </EntityListLayout>
        </>
    );
};