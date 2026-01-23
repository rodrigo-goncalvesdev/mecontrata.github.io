const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // 🔥 ESSENCIAL
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Banco de dados
const db = new sqlite3.Database(path.join(__dirname, "database.db"));

// Criação da tabela
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    nascimento TEXT NOT NULL,
    cep TEXT NOT NULL,
    endereco TEXT NOT NULL
  )
`);

// Verificar email (login – etapa 1)
app.post("/check-email", (req, res) => {
  const { email } = req.body;

  db.get(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, row) => {
      if (err) return res.status(500).json({ exists: false });
      res.json({ exists: !!row });
    }
  );
});

// Login (etapa 2)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT password FROM users WHERE email = ?",
    [email],
    async (err, row) => {
      if (!row) return res.json({ success: false });

      const ok = await bcrypt.compare(password, row.password);
      res.json({ success: ok });
    }
  );
});

// Cadastro
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Dados inválidos" });
  }

  const hash = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    function (err) {
      if (err) {
        return res.json({ success: false, message: "Email já cadastrado" });
      }
      res.json({ success: true });
    }
  );
});
// Verificar CPF
app.post("/check-cpf", (req, res) => {
  const { cpf } = req.body;

  db.get(
    "SELECT id FROM profiles WHERE cpf = ?",
    [cpf],
    (err, row) => {
      res.json({ exists: !!row });
    }
  );
});

// Criar perfil
app.post("/profile", (req, res) => {
  const { nome, cpf, email, nascimento, cep, endereco } = req.body;

  if (!nome || !cpf || !email || !nascimento || !cep || !endereco) {
    return res.json({ success: false, message: "Dados incompletos" });
  }

  // Formulario
  db.run(
    `INSERT INTO profiles (nome, cpf, email, nascimento, cep, endereco)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, cpf, email, nascimento, cep, endereco],
    function (err) {
      if (err) {
        return res.json({
          success: false,
          message: "CPF ou Email já cadastrado"
        });
      }
      res.json({ success: true });
    }
  );
});


// Start
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

