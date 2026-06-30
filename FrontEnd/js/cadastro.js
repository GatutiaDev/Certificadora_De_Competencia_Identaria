const formCadastro = document.getElementById("cadastroForm");

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("emailCadastro").value;
    const password = document.getElementById("passwordCadastro").value;

    try {
        await window.api.cadastrarUsuario({
            name,
            email,
            password
        });


        alert("Usuário cadastrado!");

        window.location.href = "login.html";

    } catch (error) {
        alert(error.message || "Erro ao cadastrar usuário");
    }
});
