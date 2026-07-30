const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./banco.sqlite', (err) => {
    if (err) console.error('Erro ao conectar ao banco de dados:', err.message);
    else {
        console.log('Conectado ao banco de dados SQLite com sucesso.');
    
        db.run(`
            CREATE TABLE IF NOT EXISTS ads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT NOT NULL,
                price REAL,
                type TEXT NOT NULL CHECK(type IN ('Venda', 'Doacao')),
                imageUrl TEXT
            )
        `);
    }
});


// As rotas da API
app.post('/ads', (req, res) => {
    const { title, description, category, price, type, imageUrl } = req.body;
    
    if (!title || !category || !type) {
        return res.status(400).json({ error: "Campos 'title', 'category' e 'type' são obrigatórios." });
    }

    const query = `INSERT INTO ads (title, description, category, price, type, imageUrl) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [title, description, category, price, type, imageUrl], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: 'Anúncio cadastrado com sucesso!' });
    });
});

app.get('/ads', (req, res) => {
    const { category } = req.query;
    let query = `SELECT * FROM ads`;
    let params = [];

    if (category) {
        query += ` WHERE category = ?`;
        params.push(category);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete('/ads/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM ads WHERE id = ?`, id, function(err) {

        if (err) return res.status(500).json({ error: err.message });
        
        if (this.changes === 0) {
            return res.status(404).json({ message: "Anúncio não encontrado." });
        }
        
        res.json({ message: 'Anúncio removido com sucesso!' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});