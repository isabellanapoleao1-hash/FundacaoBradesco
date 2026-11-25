import express from "express";
import db from "../db.js";

const router = express.Router();

// Listar alunos
router.get("/", async (req, res) => {
  try {
    const [alunos] = await db.query("SELECT * FROM aluno ORDER BY id_aluno");

    res.json(alunos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar alunos." });
  }
});

// Cadastrar aluno
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    if (!nome || !email) {
      return res.status(400).json({
        erro: "Nome e e-mail são obrigatórios.",
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO aluno (nome, email, telefone, data_cadastro)
       VALUES (?, ?, ?, CURDATE())`,
      [nome, email, telefone || null],
    );

    res.status(201).json({
      mensagem: "Aluno cadastrado!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    res.status(500).json({ erro: "Erro ao cadastrar aluno." });
  }
});

export default router;
