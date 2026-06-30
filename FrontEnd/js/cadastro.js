const formCadastro = document.getElementById("cadastroForm");

formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("emailCadastro").value;
    const password = document.getElementById("passwordCadastro").value;

    console.log({ name, email, password });

    try {
        const response = await axios.post("http://localhost:3000/usuario/cadastro", {
            name,
            email,
            password
        });


        alert("Usuário cadastrado!");

        window.location.href = "login.html";

    } catch (error) {
        alert(error?.response?.data?.error || "Erro ao cadastrar usuário");
    }
});