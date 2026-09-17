import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// --- ROTAS CAVALOS ---
app.get('/api/cavalos', async (req, res) => {
    const cavalos = await prisma.cavalo.findMany();
    res.json(cavalos);
});

app.post('/api/cavalos', async (req, res) => {
    const { nome, raca, ativo } = req.body;
    const novo = await prisma.cavalo.create({ data: { nome, raca, ativo } });
    res.status(201).json(novo);
});

// BUSCAR APENAS UM CAVALO POR ID
app.get('/api/cavalos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cavalo = await prisma.cavalo.findUnique({
            where: { id: Number(id) },
        });

        if (!cavalo) {
            return res.status(404).json({ error: 'Cavalo não encontrado' });
        }

        return res.json(cavalo);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar cavalo' });
    }
});

app.delete('/api/cavalos/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.cavalo.delete({ where: { id: Number(id) } });
    res.status(204).send();
});

// --- ROTAS PRATICANTES ---
app.get('/api/praticantes', async (req, res) => {
    const praticantes = await prisma.praticante.findMany();
    res.json(praticantes);
});

// backend/src/server.ts
// backend/src/server.ts
app.post('/api/praticantes', async (req, res) => {
    try {
        const {
            nome,
            dataNascimento,
            diagnostico,
            nomeResponsavel,
            telefoneResponsavel
        } = req.body;

        const novoPraticante = await prisma.praticante.create({
            data: {
                nome,
                dataNascimento,
                diagnostico,
                nomeResponsavel,
                telefoneResponsavel,
            },
        });

        return res.status(201).json(novoPraticante);
    } catch (error) {
        // Imprima o erro real no terminal do backend para inspecionar a causa exata
        console.error('Erro detalhado do Prisma:', error);
        return res.status(500).json({ error: 'Erro ao criar praticante no banco.', details: String(error) });
    }
});
// --- ROTAS EQUOTERAPEUTAS ---
app.get('/api/equoterapeutas', async (req, res) => {
    const terapeutas = await prisma.equoterapeuta.findMany();
    res.json(terapeutas);
});

app.post('/api/equoterapeutas', async (req, res) => {
    const novo = await prisma.equoterapeuta.create({ data: req.body });
    res.status(201).json(novo);
});

app.listen(3000, () => {
    console.log('🚀 Backend rodando em http://localhost:3000');
});