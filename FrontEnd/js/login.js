const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await window.api.loginUsuario({
            email,
            password
        });

        localStorage.setItem("token", response.token);

        alert("Login realizado!");

        window.location.href = "index.html";

    } catch (error) {
        alert(error.message || "Erro ao realizar login");
    }
});
