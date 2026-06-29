const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await axios.post("http://localhost:3000/usuario/cadastro", {
            nome,
            email,
            password
        });

        alert("Usuário cadastrado!");

        window.location.href = "login.html";

    } catch (error) {
        alert(error.response.data.error);
    }
});