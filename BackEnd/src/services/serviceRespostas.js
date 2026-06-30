import { prisma } from "../db.js";


export async function getRespostas() {

    //filtros?
    const respostas = await prisma.respostas.findMany();
    return respostas;  

}

export async function postResposta(dados) {

    const novaResposta = await prisma.respostas.create({
      data: dados,
    });
    return novaResposta;

    if (!novaResposta) {
      throw new Error("Erro ao criar a resposta.");
    }
}

export async function updateResposta(id, dados) {

    const respostaAtualizada = await prisma.respostas.update({
      where: { id: Number(id) },
      data: dados,
    });
    return respostaAtualizada;

    if (!respostaAtualizada) {
      throw new Error("Erro ao atualizar a resposta.");
    }
}

export async function deleteResposta(id) {
    const respostaDeletada = await prisma.respostas.delete({
      where: { id: Number(id) },
    });
    return respostaDeletada;

    if (!respostaDeletada) {
      throw new Error("Erro ao deletar a resposta.");
    }
}