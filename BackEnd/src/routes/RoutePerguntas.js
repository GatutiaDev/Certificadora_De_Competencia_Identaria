import * as controllerPerguntas from "../controller/controllerPerguntas.js";
import express from "express";

const router = express.Router();

router.get("/", controllerPerguntas.ListarPerguntas);
router.post("/", controllerPerguntas.CriarPergunta);
router.put("/:id", controllerPerguntas.AtualizarPergunta);
router.delete("/:id", controllerPerguntas.DeletarPergunta);

export default router;