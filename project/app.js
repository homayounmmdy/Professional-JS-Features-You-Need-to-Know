const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  window.location.href = "view/dashboard/dashboard.html";
} else {
  window.location.href = "view/login.html";
}
