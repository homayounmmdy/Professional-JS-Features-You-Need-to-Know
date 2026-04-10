import { seed } from "../../data/seed.js";

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

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = window.location.origin + "/project/view/login.html";
});

const customersTable = document.querySelector(".customers-table tbody");

customersTable.innerHTML = "";

seed.customers.forEach((customer) => {
  if (customer.bankId === storedUser.roleObject.bankId) {
    const row = document.createElement("tr");

    const Id = document.createElement("td");
    Id.textContent = customer.customerId;
    row.appendChild(Id);

    const name = document.createElement("td");
    name.textContent = `${customer.firstName} ${customer.lastName}`;
    row.appendChild(name);

    const dob = document.createElement("td");
    dob.textContent = customer.dob;
    row.appendChild(dob);

    customersTable.appendChild(row);
  }
});

const accountsTable = document.querySelector(".accounts-table tbody");

accountsTable.innerHTML = "";

seed.accounts.forEach((account) => {
  if (account.bankId === storedUser.roleObject.bankId) {
    const row = document.createElement("tr");

    const accountNumber = document.createElement("td");
    accountNumber.textContent = account.accountNumber;
    row.appendChild(accountNumber);

    const balance = document.createElement("td");
    balance.textContent = account.balance;
    row.appendChild(balance);

    const customerId = document.createElement("td");
    customerId.textContent = account.customerId;
    row.appendChild(customerId);

    accountsTable.appendChild(row);
  }
});
