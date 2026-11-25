import express from "express";
import db from "../db.js";

const router = express.Router();

// Listar todas as categorias
router.get("/", async (req, res) => {
  try {
    const [categorias] = await db.query("SELECT * FROM categoria ORDER BY id_categoria");

    res.json(categorias);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar categorias." });
  }
});

// Cadastrar categoria
router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Informe o nome." });
    }

    const [resultado] = await db.query("INSERT INTO categoria (nome) VALUES (?)", [nome]);

    res.status(201).json({
      mensagem: "Categoria cadastrada!",
      id: resultado.insertId,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar categoria." });
  }
});

export default router;
