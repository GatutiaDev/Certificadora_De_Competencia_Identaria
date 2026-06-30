import * as serviceRespostas from "../services/serviceRespostas.js";

export async function ListarRespostas(req, res) {
    try {
        const respostas = await serviceRespostas.getRespostas();
        res.json(respostas);
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }       
}

export async function CriarResposta(req, res) {
    try {
        const dados = req.body;
        const novaResposta = await serviceRespostas.postResposta(dados);
        res.status(201).json(novaResposta);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export async function AtualizarResposta(req, res) {
    try {
        const { id } = req.params;
        const dados = req.body;
        const respostaAtualizada = await serviceRespostas.updateResposta(id, dados);
        res.json(respostaAtualizada);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function DeletarResposta(req, res) {
    try {
        const { id } = req.params;
        const respostaDeletada = await serviceRespostas.deleteResposta(id);
        res.json(respostaDeletada);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}