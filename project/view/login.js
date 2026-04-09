import {AuthController} from "../controller/authController.js";
import {seed} from "../data/seed.js";

const usernameEL = document.querySelector('#username');
const passwordEL = document.querySelector('#password');
const tableBody = document.querySelector('table tbody');

// Clear existing content and then populate
tableBody.innerHTML = '';

seed.users.forEach(user => {
    const row = document.createElement('tr');

    const roleCell = document.createElement('td');
    roleCell.textContent = user.role;
    row.appendChild(roleCell);

    const userNameCell = document.createElement('td');
    userNameCell.textContent = user.username;
    row.appendChild(userNameCell);

    const passwordCell = document.createElement('td');
    passwordCell.textContent = user.password;
    row.appendChild(passwordCell);

    const actionCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Apply';
    button.className = 'apply-btn';
    button.dataset.username = user.username;
    button.dataset.password = user.password;
    actionCell.appendChild(button);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
});


tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('apply-btn')) {
        const username = event.target.dataset.username;
        const password = event.target.dataset.password;

        usernameEL.value = username;
        passwordEL.value = password;
    }
});

// do auth

const auth = new AuthController();

document.querySelector('#loginBtn').addEventListener('click', () => {
    try {
        const loggedUser = auth.login(usernameEL.value, passwordEL.value);

        localStorage.setItem("user", JSON.stringify(loggedUser));

        window.location.href = "dashboard.html";

        usernameEL.value = "";
        passwordEL.value = "";
    } catch (err) {
        document.getElementById("error").innerText = err.message;
    }
});