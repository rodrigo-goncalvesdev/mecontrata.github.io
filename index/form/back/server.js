const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = 3000;
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
const db = new sqlite3.Database("./database.db");
db.run(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    nascimento TEXT NOT NULL,
    cep TEXT NOT NULL,
    endereco TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
app.post("/check-cpf", (req, res) => {
  const { cpf } = req.body;
  if (!cpf || cpf.length !== 11) {
    return res.json({ exists: false });
  }
  db.get(
    "SELECT id FROM profiles WHERE cpf = ?",
    [cpf],
    (err, row) => {
      if (err) {
        return res.status(500).json({ exists: false });
      }
      res.json({ exists: !!row });
    }
  );
});
app.post("/profile", (req, res) => {
  const { nome, cpf, email, nascimento, cep, endereco } = req.body;
  if (!nome || !cpf || !email || !nascimento || !cep || !endereco) {
    return res.json({
      success: false,
      message: "Preencha todos os campos"
    });
  }
  const sql = `
    INSERT INTO profiles
    (nome, cpf, email, nascimento, cep, endereco)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.run(
    sql,
    [nome, cpf, email, nascimento, cep, endereco],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.json({
            success: false,
            message: "CPF já cadastrado"
          });
        }
        return res.status(500).json({
          success: false,
          message: "Erro ao salvar"
        });
      }
      res.json({ success: true });
    }
  );
});
app.get("/profiles", (req, res) => {
  db.all(
    "SELECT id, nome, email, nascimento, cep, endereco, created_at FROM profiles",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Erro ao buscar dados"
        });
      }
      res.json({
        success: true,
        data: rows
      });
    }
  );
});
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});