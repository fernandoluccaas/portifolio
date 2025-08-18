// backend/server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; // Porta que o servidor vai usar

// Middlewares
app.use(cors()); // Permite que seu site (rodando em outra porta) se comunique com este servidor
app.use(express.json()); // Habilita o servidor a entender dados em formato JSON

// A "rota" que vai receber os dados do formulário
app.post('/enviar-contato', (req, res) => {
    const { name, email, message } = req.body;

    // --- VALIDAÇÃO NO BACK-END (ESSENCIAL) ---
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    console.log('Dados recebidos:', { name, email, message });

    // --- AQUI ENTRA A LÓGICA DO BANCO DE DADOS ---
    // Exemplo conceitual (você precisaria instalar um driver como 'pg' para PostgreSQL ou 'mysql2' para MySQL)
    /*
    const db = require('./db-connection'); // Módulo de conexão com o DB
    const query = 'INSERT INTO contatos (nome, email, mensagem) VALUES ($1, $2, $3)';
    db.query(query, [name, email, message])
        .then(() => {
            res.status(200).json({ success: 'Mensagem enviada com sucesso!' });
        })
        .catch(err => {
            console.error('Erro ao salvar no banco de dados:', err);
            res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
        });
    */
    
    // Por enquanto, vamos apenas simular o sucesso
    res.status(200).json({ success: 'Mensagem recebida com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});