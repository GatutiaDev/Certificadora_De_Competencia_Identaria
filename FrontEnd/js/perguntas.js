const perguntasLista = document.getElementById("perguntasLista");
const perguntaForm = document.getElementById("perguntaForm");
const perguntaMensagem = document.getElementById("perguntaMensagem");

function getUsuarioLogado() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { id: payload.id, name: payload.name };
    } catch (error) {
        return null;
    }
}

function setMensagem(texto, tipo = "") {
    if (!perguntaMensagem) {
        return;
    }

    perguntaMensagem.textContent = texto;
    perguntaMensagem.className = `mensagem-pergunta ${tipo}`.trim();
}

function escapeHTML(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
    }[char]));
}

function renderPerguntas(perguntas) {
    if (!perguntasLista) {
        return;
    }

    const limite = Number(perguntasLista.dataset.limit || 0);
    const perguntasExibidas = limite ? perguntas.slice(0, limite) : perguntas;

    if (!perguntasExibidas.length) {
        perguntasLista.innerHTML = '<p class="estado-perguntas">Nenhuma pergunta cadastrada ainda.</p>';
        return;
    }

    perguntasLista.innerHTML = perguntasExibidas.map((pergunta) => {
        const totalRespostas = pergunta.respostas?.length || 0;
        const autor = escapeHTML(pergunta.user?.name || "Usuario");
        const respostas = pergunta.respostas || [];
        const respostaForm = limite ? "" : `
            <div class="area-respostas" id="respostas-${pergunta.id}" hidden>
                <div class="respostas-lista">
                    ${renderRespostas(respostas)}
                </div>
                <form class="form-resposta" data-question-id="${pergunta.id}">
                    <label for="resposta-${pergunta.id}">Sua resposta</label>
                    <textarea id="resposta-${pergunta.id}" name="content" placeholder="Escreva sua resposta" required></textarea>
                    <button class="btn-auth" type="submit">Enviar resposta</button>
                    <p class="mensagem-resposta"></p>
                </form>
            </div>
        `;

        return `
            <div class="card">
                <div>
                    <h2>${escapeHTML(pergunta.title)}</h2>
                    <p class="descricao">${escapeHTML(pergunta.description)}</p>
                    <div class="infos">
                        <span>Usuario: ${autor}</span>
                        <button class="btn-ver-resp" type="button" onclick="verRespostas(${pergunta.id})">${totalRespostas} resposta${totalRespostas === 1 ? "" : "s"}</button>
                    </div>
                </div>
                <button class="btn-responder" type="button" onclick="responderPergunta(${pergunta.id})">Responder</button>
                ${respostaForm}
            </div>
        `;
    }).join("");
}

function renderRespostas(respostas) {
    if (!respostas.length) {
        return '<p class="sem-respostas">Ainda nao ha respostas para esta pergunta.</p>';
    }

    return respostas.map((resposta) => {
        const autor = escapeHTML(resposta.user?.name || "Usuario");

        return `
            <div class="resposta-item">
                <p>${escapeHTML(resposta.content)}</p>
                <span>Respondido por ${autor}</span>
            </div>
        `;
    }).join("");
}

async function carregarPerguntas() {
    if (!perguntasLista) {
        return;
    }

    perguntasLista.innerHTML = '<p class="estado-perguntas">Carregando perguntas...</p>';

    try {
        const perguntas = await window.api.getPerguntas();
        renderPerguntas(perguntas);
    } catch (error) {
        perguntasLista.innerHTML = '<p class="estado-perguntas erro">Nao foi possivel carregar as perguntas.</p>';
    }
}

function fazerPergunta() {
    const novaPergunta = document.getElementById("novaPergunta");

    if (novaPergunta) {
        novaPergunta.scrollIntoView({ behavior: "smooth" });
        return;
    }

    window.location.href = "perguntas.html";
}

function abrirAreaRespostas(perguntaId) {
    const area = document.getElementById(`respostas-${perguntaId}`);

    if (!area) {
        window.location.href = "perguntas.html";
        return null;
    }

    area.hidden = false;
    area.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return area;
}

function verRespostas(perguntaId) {
    abrirAreaRespostas(perguntaId);
}

function responderPergunta(perguntaId) {
    const area = abrirAreaRespostas(perguntaId);
    area?.querySelector("textarea")?.focus();
}

if (perguntasLista) {
    perguntasLista.addEventListener("submit", async (event) => {
        const form = event.target.closest(".form-resposta");

        if (!form) {
            return;
        }

        event.preventDefault();

        const usuario = getUsuarioLogado();
        const mensagem = form.querySelector(".mensagem-resposta");

        if (!usuario?.id) {
            mensagem.textContent = "Faca login para responder.";
            mensagem.className = "mensagem-resposta erro";
            return;
        }

        const content = form.elements.content.value.trim();

        if (!content) {
            mensagem.textContent = "Escreva uma resposta.";
            mensagem.className = "mensagem-resposta erro";
            return;
        }

        try {
            mensagem.textContent = "Enviando resposta...";
            mensagem.className = "mensagem-resposta";
            await window.api.createResposta({
                content,
                userId: usuario.id,
                questionId: Number(form.dataset.questionId),
            });
            form.reset();
            mensagem.textContent = "Resposta criada com sucesso!";
            mensagem.className = "mensagem-resposta sucesso";
            await carregarPerguntas();
            abrirAreaRespostas(Number(form.dataset.questionId));
        } catch (error) {
            mensagem.textContent = error.message || "Erro ao criar resposta.";
            mensagem.className = "mensagem-resposta erro";
        }
    });
}

if (perguntaForm) {
    perguntaForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const usuario = getUsuarioLogado();

        if (!usuario?.id) {
            setMensagem("Faca login para criar uma pergunta.", "erro");
            return;
        }

        const title = document.getElementById("perguntaTitulo").value.trim();
        const description = document.getElementById("perguntaDescricao").value.trim();

        if (!title || !description) {
            setMensagem("Preencha titulo e descricao.", "erro");
            return;
        }

        try {
            setMensagem("Enviando pergunta...");
            await window.api.createPergunta({ title, description, userId: usuario.id });
            perguntaForm.reset();
            setMensagem("Pergunta criada com sucesso!", "sucesso");
            await carregarPerguntas();
        } catch (error) {
            setMensagem(error.message || "Erro ao criar pergunta.", "erro");
        }
    });
}

window.fazerPergunta = fazerPergunta;
window.responderPergunta = responderPergunta;
window.verRespostas = verRespostas;

carregarPerguntas();
