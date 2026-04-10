const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

document.getElementById("title").innerText = `${user.role} Dashboard`;

const content = document.getElementById("content");

function loadData(file) {
  fetch(`./${file}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((htmlData) => {
      content.innerHTML = htmlData;

      const script = document.createElement("script");
      script.src = `./${file}.js`;
      script.type = "module";
      script.onerror = () => {
        console.error(`Error loading ${file}.js`);
      };
      document.body.appendChild(script);
    })
    .catch((error) => {
      console.error("There was a problem loading the HTML:", error);
    });
}

if (user.role === "central_bank") {
  loadData("centralBankView");
}

if (user.role === "bank_manager") {
  loadData("bankManagerView");
}

if (user.role === "customer") {
  loadData("customerView");
}
