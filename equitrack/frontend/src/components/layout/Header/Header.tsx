import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Header.module.css';

// Ícones e assets
import backIcon from '../../../assets/icons/voltar.svg'; // Adicione o ícone da seta
import userPlaceholder from '../../../assets/placeholders/user.jpg';

interface HeaderProps {
    title?: string;
    showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    title = 'Gestão',
    showBackButton = true
}) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* Botão de voltar */}
                {showBackButton && (
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => navigate(-1)}
                        aria-label="Voltar"
                    >
                        <img src={backIcon} alt="Voltar" />
                    </button>
                )}

                {/* Título dinâmico */}
                <h1 className={styles.title}>{title}</h1>

                {/* Avatar dinâmico (usa foto do user ou o placeholder) */}
                <img
                    className={styles.navUserImg}
                    src={user?.avatarUrl || userPlaceholder}
                    alt={user?.nome || 'Usuário'}
                />
            </nav>
        </header>
    );
};