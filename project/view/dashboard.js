const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

document.getElementById("title").innerText = `${user.role} Dashboard`;

const content = document.getElementById("content");

if (user.role === "central_bank") {
  content.innerHTML = `
    <h3>Full Access Of Central Bank</h3>
    <ul>
        <li>Be able to see all the banks</li>
        <li>Be able to see all the customers</li>
        <li>Be able to see all the accounts</li>
    </ul>
    `;
}

if (user.role === "bank_manager") {
    fetch('bank_manager.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(htmlData => {
            content.innerHTML = htmlData;

            const script = document.createElement('script');
            script.src = './bankManagerView.js';
            script.type = "module";
            script.onerror = () => {
                console.error('Error loading bankManagerView.js');
            };
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('There was a problem loading the HTML:', error);
        });
}


if (user.role === "customer") {
  content.innerHTML = `
    <h3>Dear Customer You are welcome</h3>
    <ul>
        <li>Be able to see your accounts</li>
        <li>Deposit / Withdraw</li>
        <li>See the Transactions</li>
    </ul>
    `;
}
