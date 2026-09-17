import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { Button } from '../../components/ui/Button/Button';
import { NavCard } from '../../components/cards/NavCard/NavCard';
import { LastSessionCard } from '../../components/cards/LastSessionCard/LastSessionCard';
import styles from './HomeMobile.module.css';

// Imports de Ícones do Card Nav
import iconPessoas from '../../assets/icons/people-fill.svg';
import iconCavalos from '../../assets/icons/horse.png';
import iconSessao from '../../assets/icons/clipboard.png';
import iconFormulario from '../../assets/icons/contact-form.png';

// Imports de Ícones da Sessão
import iconHorse from '../../assets/icons/horse.png';
import iconForm from '../../assets/icons/contact-form.png';

// Import de Placeholder
import fotoPraticante from '../../assets/placeholders/praticante_1.png';
import { Divider } from '../../components/ui/Divider/Divider';

export const HomeMobile: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <Header title="Tela Inicial" />

            <main className={styles.mainContent}>
                <section className={styles.containerCta}>
                    <Button variant="primary" >
                        Iniciar Sessão
                    </Button>

                    <Divider width='large' backgroundColor='corVerdeEscuro'></Divider>

                </section>

                <section className={styles.containerNavegationMobileBtns}>
                    <NavCard title="Praticantes" iconSrc={iconPessoas} />
                    <NavCard title="Cavalos" iconSrc={iconCavalos} />
                    <NavCard title="Sessões" iconSrc={iconSessao} />
                    <NavCard title="Formulários" iconSrc={iconFormulario} />
                </section>

                <Divider width='large' backgroundColor='corVerdeEscuro'></Divider>

                <section className={styles.containerLastSession}>
                    <h4>Última Sessão Realizada</h4>

                    <LastSessionCard
                        patientName="Mauro Henrique Gonçalves Leonardo"
                        horseName="Marcelo Horse"
                        formName="Fisico-Motora (v2)"
                        endDate="23/06/26 - 13:39"
                        horseIcon={iconHorse}
                        formIcon={iconForm}
                        patientPhoto={fotoPraticante}
                    />
                </section>
            </main>


        </div>
    );
};