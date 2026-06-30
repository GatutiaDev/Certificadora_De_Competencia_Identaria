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

        return `
            <div class="card">
                <div>
                    <h2>${escapeHTML(pergunta.title)}</h2>
                    <p class="descricao">${escapeHTML(pergunta.description)}</p>
                    <div class="infos">
                        <span>Usuario: ${autor}</span>
                        <a href="#" class="btn-ver-resp">${totalRespostas} resposta${totalRespostas === 1 ? "" : "s"}</a>
                    </div>
                </div>
                <button class="btn-responder" type="button" onclick="responderPergunta()">Responder</button>
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

function responderPergunta() {
    alert("Area para responder a pergunta");
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

carregarPerguntas();
