const API_BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok) {
        throw new Error(data?.error || "Erro ao comunicar com a API");
    }

    return data;
}

function getPerguntas() {
    return request("/perguntas");
}

function createPergunta(pergunta) {
    return request("/perguntas", {
        method: "POST",
        body: JSON.stringify(pergunta),
    });
}

function loginUsuario(credentials) {
    return request("/usuario/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

function cadastrarUsuario(usuario) {
    return request("/usuario/cadastro", {
        method: "POST",
        body: JSON.stringify(usuario),
    });
}

window.api = {
    API_BASE_URL,
    getPerguntas,
    createPergunta,
    loginUsuario,
    cadastrarUsuario,
};
