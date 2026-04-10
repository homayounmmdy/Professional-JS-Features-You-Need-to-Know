const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.roleObject) {
    window.location.href = window.location.origin + "/project/view/login.html";
}

document.querySelector(".logout-btn").addEventListener("click" , () => {
    localStorage.removeItem("user");
    console.log(window.location.origin)
    window.location.href = window.location.origin + "/project/view/login.html";
});