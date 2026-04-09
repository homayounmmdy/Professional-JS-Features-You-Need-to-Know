import {AuthController} from "../controller/authController.js";
import {seed} from "../data/seed.js";

// fill the table
document.querySelector('table').innerHTML =`
    <thead>
        <tr>
            <th>Role</th>
            <th>Password</th>
        </tr>
    </thead>
    
    <tbody>
        ${seed.users.map(user => `
        <tr>
            <td>${user.role}</td>
            <td>${user.password}</td>
        </tr>
        `).join("")}
    </tbody>
`;


// do auth

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
});