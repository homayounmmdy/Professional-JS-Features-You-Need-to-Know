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
    `
}
if (user.role === "bank_manager") {
    content.innerHTML = `
    <h3>Bank manager - Your bank managements</h3>
    <p>Your bank : ${user.roleObject.bankId}</p>
    <ul>
        <li>Be able to see all the customers of bank</li>
        <li>Be able to see all the accounts of bank</li>
        <li>Be able to create customer</li>
    </ul>
    `
}
if (user.role === "customer") {
    content.innerHTML = `
    <h3>Dear Customer You are welcome</h3>
    <ul>
        <li>Be able to see your accounts</li>
        <li>Deposit / Withdraw</li>
        <li>See the Transactions</li>
    </ul>
    `
}