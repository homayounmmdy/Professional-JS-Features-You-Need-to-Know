import { seed } from "../../data/seed.js";

const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.roleObject) {
  window.location.href = window.location.origin + "/project/view/login.html";
}

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user");
  console.log(window.location.origin);
  window.location.href = window.location.origin + "/project/view/login.html";
});

const banksTable = document.querySelector(".banks-table tbody");

banksTable.innerHTML = "";

seed.banks.forEach((bank) => {
  const row = document.createElement("tr");

  const bankId = document.createElement("td");
  bankId.textContent = bank.bankId;
  row.appendChild(bankId);

  const bankName = document.createElement("td");
  bankName.textContent = bank.name;
  row.appendChild(bankName);

  banksTable.appendChild(row);
});

const customersTable = document.querySelector(".customers-table tbody");

customersTable.innerHTML = "";

seed.customers.forEach((user) => {
  const row = document.createElement("tr");

  const Id = document.createElement("td");
  Id.textContent = user.customerId;
  row.appendChild(Id);

  const name = document.createElement("td");
  name.textContent = `${user.firstName} ${user.lastName}`;
  row.appendChild(name);

  const dob = document.createElement("td");
  dob.textContent = user.dob;
  row.appendChild(dob);

  const bankId = document.createElement("td");
  bankId.textContent = user.bankId;
  row.appendChild(bankId);

  customersTable.appendChild(row);
});

const accountsTable = document.querySelector(".accounts-table tbody");

accountsTable.innerHTML = "";

seed.accounts.forEach((account) => {
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

  const bankId = document.createElement("td");
  bankId.textContent = account.bankId;
  row.appendChild(bankId);

  accountsTable.appendChild(row);
});