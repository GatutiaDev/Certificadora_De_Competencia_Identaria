import * as serviceLogin from "../services/serviceLogin.js";

export async function fazerCadastro(req, res) {
    try {
        const user = await serviceLogin.postCadastro(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function fazerLogin(req, res) {
    try {
        const token = await serviceLogin.postLogin(req.body);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}