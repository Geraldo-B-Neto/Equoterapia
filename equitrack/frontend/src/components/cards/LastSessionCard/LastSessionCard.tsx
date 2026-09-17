import React from 'react';
import styles from './LastSessionCard.module.css';

interface LastSessionCardProps {
  patientName: string;
  horseName: string;
  formName: string;
  endDate: string;
  horseIcon: string;
  formIcon: string;
  patientPhoto: string;
  onViewEvaluation?: () => void;
}

export const LastSessionCard: React.FC<LastSessionCardProps> = ({
  patientName,
  horseName,
  formName,
  endDate,
  horseIcon,
  formIcon,
  patientPhoto,
  onViewEvaluation,
}) => {
  return (
    <div className={styles.cardSession}>
      <article className={styles.rowFlex}>
        <img src={patientPhoto} alt="Foto do paciente" />
        <div className={styles.sessionInfo}>
          <aside className={styles.badgeConcluida}>
            Status: Concluída
          </aside>
          <h2>{patientName}</h2>
          <aside className={styles.sessionInfoAside}>
            <img src={horseIcon} alt="Cavalo" />
            {horseName}
          </aside>
          <aside className={styles.sessionInfoAside}>
            <img src={formIcon} alt="Formulário" />
            {formName}
          </aside>
        </div>
      </article>

      <div className={styles.divider2}>&nbsp;</div>

      <div className={styles.rowFlex}>
        <aside>Término: {endDate}</aside>
        <aside className={styles.linkAction} onClick={onViewEvaluation}>
          Ver Avaliação &gt;
        </aside>
      </div>
    </div>
  );
};