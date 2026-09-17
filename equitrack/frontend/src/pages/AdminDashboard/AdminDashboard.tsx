// src/pages/AdminDashboard/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Button } from '../../components/ui/Button/Button';
import { CavaloService } from '../../services/CavaloService';
import { PraticanteService } from '../../services/PraticanteService';
import { EquoterapeutaService } from '../../services/EquoterapeutaService';

import styles from './AdminDashboard.module.css';
import { Divider } from '../../components/ui/Divider';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    praticantes: 0,
    cavalos: 0,
    equoterapeutas: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const [praticantes, cavalos, terapeutas] = await Promise.all([
          PraticanteService.listarTodos(),
          CavaloService.listarTodos(),
          EquoterapeutaService.listarTodos(),
        ]);

        setCounts({
          praticantes: praticantes.length,
          cavalos: cavalos.length,
          equoterapeutas: terapeutas.length,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas do painel:', error);
      }
    }

    loadStats();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.container}>
          <h1>Painel de Administração</h1>

          <Divider width='large' backgroundColor='corVerdeEscuro' />

          <div className={styles.metricsGrid}>
            <div className={styles.card}>

              <img src="https://cdn-icons-png.flaticon.com/512/1256/1256661.png" alt="Praticantes" />

              <article className={styles.metrics}>
                <h2>Praticantes</h2>
                <p className={styles.number}>{counts.praticantes}</p>
              </article>

            </div>
            <div className={styles.card}>

              <img src="https://cdn-icons-png.flaticon.com/512/3233/3233483.png" alt="Cavalos" />

              <article className={styles.metrics}>
                <h2>Cavalos</h2>
                <p className={styles.number}>{counts.cavalos}</p>
              </article>

            </div>
            <div className={styles.card}>

              <img src="https://cdn-icons-png.flaticon.com/512/1971/1971439.png" alt="Equoterapeutas" />

              <article className={styles.metrics}>
                <h2>Equoterapeutas</h2>
                <p className={styles.number}>{counts.equoterapeutas}</p>
              </article>

            </div>
          </div>

          <h2 className={styles.subTitle}>Gerenciamento Geral</h2>
          <div className={styles.actionsGrid}>
            <div className={styles.actionCard}>
              <h3>Praticantes</h3>
              <div className={styles.buttonGroup}>
                <Button variant="primary" onClick={() => navigate('/praticantes/novo')}>
                  + Novo Praticante
                </Button>
                <Button variant="white" onClick={() => navigate('/praticantes')}>
                  Ver Todos
                </Button>
              </div>
            </div>

            <div className={styles.actionCard}>
              <h3>Cavalos</h3>
              <div className={styles.buttonGroup}>
                <Button variant="primary" onClick={() => navigate('/cavalos/novo')}>
                  + Novo Cavalo
                </Button>
                <Button variant="white" onClick={() => navigate('/cavalos')}>
                  Ver Todos
                </Button>
              </div>
            </div>

            <div className={styles.actionCard}>
              <h3>Equoterapeutas</h3>
              <div className={styles.buttonGroup}>
                <Button variant="primary" onClick={() => navigate('/equoterapeutas/novo')}>
                  + Novo<br />Equoterapeuta
                </Button>
                <Button variant="white" onClick={() => navigate('/equoterapeutas')}>
                  Ver Todos
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};