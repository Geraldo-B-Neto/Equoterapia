import React from 'react';
import styles from './NavCard.module.css';

interface NavCardProps {
    title: string;
    iconSrc: string;
    onClick?: () => void;
}

export const NavCard: React.FC<NavCardProps> = ({ title, iconSrc, onClick }) => {
    return (
        <div className={styles.navegationMobileBtn} onClick={onClick}>
            <article className={styles.centerFlex}>
                <h1>{title}</h1>
                <img src={iconSrc} alt={`Ícone ${title}`} />
            </article>
        </div>
    );
};