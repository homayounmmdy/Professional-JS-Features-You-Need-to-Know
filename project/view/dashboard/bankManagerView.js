const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.roleObject) {
    window.location.href = window.location.origin + "/project/view/login.html";
}

const userRole = storedUser.roleObject;

if (storedUser.role === "bank_manager" && userRole.bankId) {
  document.getElementById("mangerBank").innerText =
    `Your Bank : ${userRole.bankId}`;
} else {
  document.getElementById("mangerBank").innerText = "Bank manger";
}

document.querySelector(".logout-btn").addEventListener("click" , () => {
    localStorage.removeItem("user");
    window.location.href = window.location.origin + "/project/view/login.html";
});