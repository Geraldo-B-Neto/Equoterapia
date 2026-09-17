import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do Provider de Autenticação
import { AuthProvider } from './contexts/authContext';

// Importação das Páginas
import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';
import { CavaloForm } from './pages/ViewForms/CavaloForm/CavaloForm';
import { PraticanteForm } from './pages/ViewForms/PraticanteForm/PraticanteForm';
import { EquoterapeutaForm } from './pages/ViewForms/EquoterapeutaForm/EquoterapeutaForm';
import { CavaloList } from './pages/Lists/CavaloList/CavaloList';
import { PraticanteList } from './pages/Lists/PraticanteList/PraticanteList';
import { EquoterapeutaList } from './pages/Lists/EquoterapeutaList/EquoterapeutaList';

import { HomeMobile } from './pages/HomeMobile/HomeMobile';

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomeMobile />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route path="/cavalos" element={<CavaloList />} />
                    <Route path="/cavalos/novo" element={<CavaloForm />} />
                    <Route path="/cavalos/editar/:id" element={<CavaloForm />} />

                    <Route path="/praticantes" element={<PraticanteList />} />
                    <Route path="/praticantes/novo" element={<PraticanteForm />} />
                    <Route path="/praticantes/editar/:id" element={<PraticanteForm />} />

                    <Route path="/equoterapeutas" element={<EquoterapeutaList />} />
                    <Route path="/equoterapeutas/novo" element={<EquoterapeutaForm />} />
                    <Route path="/equoterapeutas/editar/:id" element={<EquoterapeutaForm />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;