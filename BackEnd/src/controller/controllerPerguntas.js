import * as servicePerguntas from "../services/servicePerguntas.js";

export async function ListarPerguntas(req, res) {
  try {
    const perguntas = await servicePerguntas.getPerguntas();
    res.json(perguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function CriarPergunta(req, res) {
  try {
    const dados = req.body;
    const novaPergunta = await servicePerguntas.postPergunta(dados);
    res.status(201).json(novaPergunta);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
}

export async function AtualizarPergunta(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;
    const perguntaAtualizada = await servicePerguntas.updatePergunta(id, dados);
    res.json(perguntaAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function DeletarPergunta(req, res) {
  try {
    const { id } = req.params;
    const perguntaDeletada = await servicePerguntas.deletePergunta(id);
    res.json(perguntaDeletada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}