const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const db = new Database('./banco.sqlite', { verbose: console.log });
console.log('Conectado ao banco de dados SQLite (better-sqlite3) com sucesso.');

db.exec('DROP TABLE IF EXISTS ads;');

db.exec(`
    CREATE TABLE IF NOT EXISTS ads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        price REAL,
        type TEXT NOT NULL CHECK(type IN ('venda', 'doacao')),
        imageUrl TEXT
    )
`);


app.post('/ads', (req, res) => {
    const { title, description, category, price, type, imageUrl } = req.body;
    
    if (!title || !category || !type) {
        return res.status(400).json({ error: "Campos 'title', 'category' e 'type' são obrigatórios." });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO ads (title, description, category, price, type, imageUrl) 
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const info = stmt.run(title, description, category, price, type, imageUrl);
        
        res.status(201).json({ id: info.lastInsertRowid, message: 'Anúncio cadastrado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'API do Desapego Universitário rodando com sucesso no Render!' 
    });
});


app.get('/ads', (req, res) => {
    const { category } = req.query;
    try {
        let rows;
        if (category) {
            const stmt = db.prepare(`SELECT * FROM ads WHERE category = ?`);
            rows = stmt.all(category);
        } else {
            const stmt = db.prepare(`SELECT * FROM ads`);
            rows = stmt.all();
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.delete('/ads/:id', (req, res) => {
    const { id } = req.params;
    try {
        const stmt = db.prepare(`DELETE FROM ads WHERE id = ?`);
        const info = stmt.run(id);

        if (info.changes === 0) {
            return res.status(404).json({ message: "Anúncio não encontrado." });
        }
        
        res.json({ message: 'Anúncio removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});