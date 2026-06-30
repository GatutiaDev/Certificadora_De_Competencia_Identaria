import * as controllerLogin from "../controller/controllerLogin.js";

import express from "express";

const router = express.Router();

router.post("/cadastro", controllerLogin.fazerCadastro);
router.post("/login", controllerLogin.fazerLogin);

export default router;