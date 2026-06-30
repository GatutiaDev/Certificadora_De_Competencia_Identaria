import { prisma } from "../db.js";

export async function getPerguntas() {

    const perguntas = await prisma.perguntas.findMany({
        include: {
            user: true,
            respostas: {
                include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
            }
        },
    });
    return perguntas;
  

}

export async function postPergunta(dados) {

    const novaPergunta = await prisma.perguntas.create({
      data: dados,
    });
    return novaPergunta;

    if (!novaPergunta) {
      throw new Error("Erro ao criar a pergunta.");
    }
}

export async function updatePergunta(id, dados) {

    const perguntaAtualizada = await prisma.perguntas.update({
      where: { id: Number(id) },
      data: dados,
    });
    return perguntaAtualizada;

    if (!perguntaAtualizada) {
      throw new Error("Erro ao atualizar a pergunta.");
    }

}

export async function deletePergunta(id) {
    const perguntaDeletada = await prisma.perguntas.delete({
      where: { id: Number(id) },
    });
    return perguntaDeletada;

    if (!perguntaDeletada) {
      throw new Error("Erro ao deletar a pergunta.");
    }
}