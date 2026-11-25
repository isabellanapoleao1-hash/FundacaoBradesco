import "dotenv/config";
import express from "express";
import db from "./db.js";

import categoriasRoutes from "./routes/categorias.js";
import alunosRoutes from "./routes/alunos.js";
import cursosRoutes from "./routes/cursos.js";
import inscricoesRoutes from "./routes/inscricoes.js";

const app = express();

app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "ok",
      banco: "ok",
      app: "FundacaoBradesco",
      hora: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "erro",
      banco: "indisponível",
      app: "FundacaoBradesco",
    });
  }
});

app.use("/api/categorias", categoriasRoutes);
app.use("/api/alunos", alunosRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/inscricoes", inscricoesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
