const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:3000/usuario/login", {
            email,
            password
        });

        localStorage.setItem("token", response.data.token);

        alert("Login realizado!");

        window.location.href = "index.html";

    } catch (error) {
        alert(error.response.data.error);
    }
});