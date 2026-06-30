import express from "express";
import cors from "cors";
import PerguntasRoutes from "./src/routes/RoutePerguntas.js";
import RespostasRoutes from "./src/routes/RouteRespostas.js";
import LoginRoutes from "./src/routes/RouteLogin.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/usuario", LoginRoutes);
app.use("/perguntas", PerguntasRoutes);
app.use("/respostas", RespostasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});