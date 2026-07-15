const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3500;

// Configurar o SQLite
const dbPath = path.join(__dirname, 'respostas_portal.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS respostas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id TEXT UNIQUE,
      question_title TEXT,
      resposta TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da própria pasta
app.use(express.static(__dirname));

app.get('/api/respostas', (req, res) => {
  db.all('SELECT * FROM respostas', [], (err, rows) => {
    if (err) {
      return res.status(500).json([]);
    }
    res.json(rows);
  });
});

// Endpoint para salvar no SQLite
app.post('/api/save', (req, res) => {
  const { id, title, resposta } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO respostas (question_id, question_title, resposta, updated_at) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(question_id) DO UPDATE SET 
      resposta = excluded.resposta,
      updated_at = CURRENT_TIMESTAMP
  `);
  
  stmt.run([id, title, resposta], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true });
  });
});

// Endpoint para exportar
app.get('/export', (req, res) => {
  db.all('SELECT * FROM respostas ORDER BY question_id ASC', [], (err, rows) => {
    if (err) return res.status(500).send('Erro');
    
    let md = '# Respostas do Portal de Compras\n\n';
    rows.forEach(r => {
      if (r.resposta && r.resposta.trim() !== '') {
        md += `### ${r.question_title}\n\n`;
        md += `${r.resposta}\n\n`;
        md += `---\n\n`;
      }
    });
    
    res.setHeader('Content-disposition', 'attachment; filename=respostas_p1_portal_sugestao_compra.md');
    res.setHeader('Content-type', 'text/markdown');
    res.send(md);
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`✅ Servidor do Formulário rodando em: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
