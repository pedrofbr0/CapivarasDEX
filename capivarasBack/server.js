const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { db } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
const dbConnection = new sqlite3.Database(db.database);

// Criar tabela se não existir
dbConnection.run(`
  CREATE TABLE IF NOT EXISTS capivaras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    peso REAL,
    status_saude TEXT,
    habitat TEXT,
    comportamento TEXT,
    dieta TEXT,
    observacoes TEXT
  )
`, (err) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
    return;
  }

  // Verificar se a tabela está vazia e inserir dados se necessário
  dbConnection.get('SELECT COUNT(*) AS count FROM capivaras', (err, row) => {
    if (err) {
      console.error('Erro ao verificar a tabela:', err);
      return;
    }

    // Se a contagem for 0, significa que a tabela está vazia
    if (row.count === 0) {
      console.log('Tabela está vazia, inserindo dados...');

      const initialData = [
        { nome: 'Senhorita Bigodes', idade: 4, peso: 65, statusSaude: 'Saudável', habitat: 'Lago Sul', comportamento: 'Muito ativa, gosta de nadar no lago durante a manhã.', dieta: 'Prefere pasto fresco e frutas, especialmente maçãs.', observacoes: 'Costuma socializar com Diógenes, muitas vezes são vistos juntos.' },
        { nome: 'Helena', idade: 3, peso: 58, statusSaude: 'Saudável', habitat: 'Floresta Oeste', comportamento: 'Não socializa bem com outras capivaras, frequentemente vista descansando à sombra.', dieta: 'Consome uma variedade de vegetação, incluindo folhas e capim.', observacoes: '' },
        { nome: 'Garibalda', idade: 5, peso: 70, statusSaude: 'Necessita de cuidados', habitat: 'Recinto Norte', comportamento: 'Mais reservada, prefere ficar sozinha na maioria das vezes.', dieta: '', observacoes: 'Diagnosticada com uma infecção no olho esquerdo, tratamento com colírio iniciado.' },
        { nome: 'Diógenes', idade: 2, peso: 55, statusSaude: 'Saudável', habitat: 'Lago Sul', comportamento: 'Jovem e curioso, explora frequentemente novas áreas do recinto.', dieta: 'Gosta de uma dieta variada, incluindo frutos e vegetação densa.', observacoes: 'Mostra interesse em explorar áreas fora do habitat designado, requer monitoramento extra.' },
        { nome: 'Darius III', idade: 6, peso: 72, statusSaude: 'Saudável', habitat: 'Lago Sul', comportamento: 'Grande e dominante, tende a liderar o grupo nas interações sociais.', dieta: 'Prefere pasto grosso e casca de árvore.', observacoes: 'Mostra comportamento protetor, especialmente quando está perto de Senhorita Bigodes.' }
      ];

      initialData.forEach(data => {
        dbConnection.run(
          'INSERT INTO capivaras (nome, idade, peso, status_saude, habitat, comportamento, dieta, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [data.nome, data.idade, data.peso, data.statusSaude, data.habitat, data.comportamento, data.dieta, data.observacoes],
          function (err) {
            if (err) {
              console.error('Erro ao inserir dados:', err);
            } else {
              console.log(`Capivara "${data.nome}" inserida com sucesso.`);
            }
          }
        );
      });
    } else {
      console.log('A tabela já contém dados, não foi necessário inserir.');
    }
  });
});

// GET /api/capivaras
app.get('/api/capivaras', (req, res) => {
  dbConnection.all('SELECT * FROM capivaras', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST /api/capivaras
app.post('/api/capivaras', (req, res) => {
  const { nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacoes } = req.body;
  
  if ( nome == undefined || idade == undefined || peso == undefined || statusSaude == undefined || habitat == undefined) {
    res.status(400).json({ error: 'Campos obrigatorios nao informados' });
    return;
  }

  dbConnection.run('INSERT INTO capivaras (nome, idade, peso, status_saude, habitat, comportamento, dieta, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacoes, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, ...req.body });
    });
});

// GET /api/capivaras/:id
app.get('/api/capivaras/:id', (req, res) => {
  const id = req.params.id;
  dbConnection.get('SELECT * FROM capivaras WHERE id = ?', id, (err, row) => {
    if (err) {
      res.status(404).json({ error: 'Capivara não encontrada' });
      return;
    }
    res.json(row);
  });
});

// PUT /api/capivaras/:id
app.put('/api/capivaras/:id', (req, res) => {
  const id = req.params.id;
  const { nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacoes } = req.body;

  dbConnection.run('UPDATE capivaras SET nome = ?, idade = ?, peso = ?, status_saude = ?, habitat = ?, comportamento = ?, dieta = ?, observacoes = ? WHERE id = ?',
    nome, idade, peso, statusSaude, habitat, comportamento, dieta, observacoes, id, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: id, ...req.body });
    });
});

// DELETE /api/capivaras/:id
app.delete('/api/capivaras/:id', (req, res) => {
  const id = req.params.id;
  dbConnection.run('DELETE FROM capivaras WHERE id = ?', id, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: id });
  });
});

// Escutar na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api`);

});
  