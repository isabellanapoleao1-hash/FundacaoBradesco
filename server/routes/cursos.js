import express from "express";
import db from "../db.js";

const router = express.Router();

// Listar cursos com suas categorias
router.get("/", async (req, res) => {
  try {
    const [cursos] = await db.query(`
      SELECT curso.*, categoria.nome AS categoria
      FROM curso
      INNER JOIN categoria
      ON curso.id_categoria = categoria.id_categoria
      ORDER BY curso.id_curso
    `);

    res.json(cursos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar cursos." });
  }
});

// Cadastrar curso
router.post("/", async (req, res) => {
  try {
    const { id_categoria, nome, descricao, carga_horaria, modalidade } = req.body;

    if (!id_categoria || !nome || !carga_horaria || !modalidade) {
      return res.status(400).json({
        erro: "Preencha os campos obrigatórios.",
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO curso
       (id_categoria, nome, descricao, carga_horaria, modalidade)
       VALUES (?, ?, ?, ?, ?)`,
      [id_categoria, nome, descricao || null, carga_horaria, modalidade],
    );

    res.status(201).json({
      mensagem: "Curso cadastrado!",
      id: resultado.insertId,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar curso." });
  }
});

export default router;
