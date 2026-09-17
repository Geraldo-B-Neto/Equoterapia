import React from 'react';
import styles from './EquoterapeutaCard.module.css';
import { Divider } from '../../ui/Divider';
import { Button } from '../../ui/Button';

interface EquoterapeutaCardProps {
    statusText: string;
    isStatusActive?: boolean;
    avatarUrl?: string;
    title: string;
    info1?: string;
    info2?: string;
    actionText: string;
    onActionClick: () => void;
}

export const EquoterapeutaCard: React.FC<EquoterapeutaCardProps> = ({
    statusText,
    isStatusActive = true,
    avatarUrl = '/avatar-placeholder.png',
    title,
    info1,
    info2,
    onActionClick,
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
                    <Button variant="third" onClick={onActionClick}>
                        WhatsApp
                    </Button>


                </div>


            </div>
        </div>
    );
};