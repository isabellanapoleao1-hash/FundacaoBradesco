import express from "express";
import db from "../db.js";

const router = express.Router();

// Listar inscrições com dados dos alunos e cursos
router.get("/", async (req, res) => {
  try {
    const [inscricoes] = await db.query(`
      SELECT
        inscricao.id_inscricao,
        aluno.nome AS aluno,
        curso.nome AS curso,
        inscricao.data_inscricao,
        inscricao.status
      FROM inscricao
      INNER JOIN aluno
        ON inscricao.id_aluno = aluno.id_aluno
      INNER JOIN curso
        ON inscricao.id_curso = curso.id_curso
      ORDER BY inscricao.id_inscricao
    `);

    res.json(inscricoes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar inscrições." });
  }
});

// Cadastrar inscrição
router.post("/", async (req, res) => {
  try {
    const { id_aluno, id_curso } = req.body;

    if (!id_aluno || !id_curso) {
      return res.status(400).json({
        erro: "Informe o aluno e o curso.",
      });
    }

    const [resultado] = await db.query(
      `INSERT INTO inscricao
       (id_aluno, id_curso, data_inscricao, status)
       VALUES (?, ?, CURDATE(), 'Ativa')`,
      [id_aluno, id_curso],
    );

    res.status(201).json({
      mensagem: "Inscrição cadastrada!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar inscrição:", error);
    res.status(500).json({ erro: "Erro ao cadastrar inscrição." });
  }
});

export default router;
