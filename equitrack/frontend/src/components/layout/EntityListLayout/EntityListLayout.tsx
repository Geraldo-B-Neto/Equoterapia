import React from 'react';
import { Button } from '../../ui/Button/Button';
import { Divider } from '../../ui/Divider/Divider';
import { SearchInput } from '../../ui/SearchInput/SearchInput';
import { Footer } from '../Footer/Footer';
import { useAuth } from '../../../hooks/useAuth'; // Ajuste o caminho do seu hook de auth
import styles from './EntityListLayout.module.css';

interface EntityListLayoutProps {
    tituloHeader?: string; // Ex: "Gestão de Equoterapeutas"
    tituloBotaoTopo?: string;
    onNovoClick?: () => void;
    tituloSecao: string;
    placeholderBusca: string;
    onBuscaChange: (termo: string) => void;
    children: React.ReactNode;
}

export const EntityListLayout: React.FC<EntityListLayoutProps> = ({
    tituloBotaoTopo,
    onNovoClick,
    tituloSecao,
    placeholderBusca,
    onBuscaChange,
    children,
}) => {
    // 1. Busca os dados do usuário autenticado no contexto
    const { user } = useAuth();

    // 2. Verifica se a role/perfil do usuário é de Administrador
    const isAdmin = user?.role === 'ADMIN'; // Ou user?.isAdmin / user?.perfil === 'ADMIN', de acordo com seu projeto

    return (
        <>
            <main>
                {/* 3. O botão só é renderizado se for ADMIN E se as props de botão existirem */}
                {isAdmin && tituloBotaoTopo && onNovoClick && (
                    <>
                        <Button variant="primary" type="button" onClick={onNovoClick}>
                            {tituloBotaoTopo}
                        </Button>
                        <Divider width='large' backgroundColor='corVerdeEscuro'></Divider>
                    </>
                )}

                <h2 className={styles.sectionTitle}>{tituloSecao}</h2>

                <Divider width='medium' backgroundColor='corDourada'></Divider>

                <SearchInput
                    placeholder={placeholderBusca}
                    onChange={onBuscaChange}
                />

                <Divider width='large' backgroundColor='corVerdeEscuro'></Divider>

                <div className={styles.cardsList}>{children}</div>
            </main>
            <Footer />
        </>
    );
};