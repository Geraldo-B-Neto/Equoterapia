import React from 'react';
import styles from './CavaloCard.module.css';
import { Divider } from '../../ui/Divider';
import { Button } from '../../ui/Button';
import fotoCavalo from '../../../assets/placeholders/cavalo_1.png';

interface CavaloCardProps {
    statusText: string;
    isStatusActive?: boolean;
    avatarUrl?: string;
    title: string;
    info1?: string;
    info2?: string;
    actionText?: string;
    onActionClick?: () => void;
    onEditClick?: () => void;
}

export const CavaloCard: React.FC<CavaloCardProps> = ({
    statusText,
    isStatusActive = true,
    avatarUrl = fotoCavalo,
    title,
    info1,
    info2,
    onActionClick,
    onEditClick,
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                <img src={avatarUrl} alt={title} className={styles.avatar} />
                <div className={styles.cardInfo}>
                    <span className={`${styles.badgeStatus} ${isStatusActive ? styles.active : styles.inactive}`}>
                        {statusText}
                    </span>
                    <h1>{title}</h1>
                    {info1 && <p>{info1}</p>}
                    {info2 && <p>{info2}</p>}
                </div>
            </div>

            <div className={styles.cardFooter}>
                <Divider width='large' backgroundColor='corBranca'></Divider>
                <div>
                    <Button variant="third" onClick={onActionClick}>
                        Registros
                    </Button>
                    <Button variant="third" onClick={onEditClick || onActionClick}>
                        Editar
                    </Button>
                </div>
            </div>
        </div>
    );
};
