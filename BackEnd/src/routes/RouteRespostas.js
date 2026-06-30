import * as controllerRespostas from "../controller/controllerRespostas.js";
import express from "express";

const router = express.Router();

router.get("/", controllerRespostas.ListarRespostas);
router.post("/", controllerRespostas.CriarResposta);
router.put("/:id", controllerRespostas.AtualizarResposta);
router.delete("/:id", controllerRespostas.DeletarResposta);

export default router;