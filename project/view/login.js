import {AuthController} from "../controller/authController.js";

const auth = new AuthController();

document.querySelector('#loginBtn').addEventListener('click', () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    try {
        const loggedUser = auth.login(username, password);

        localStorage.setItem("user", JSON.stringify(loggedUser));

        window.location.href = "dashboard.html";
    } catch (err) {
        document.getElementById("error").innerText = err.message;
    }
})