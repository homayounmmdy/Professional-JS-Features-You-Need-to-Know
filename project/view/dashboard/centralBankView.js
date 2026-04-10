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

seed.banks.forEach((bank, index) => {
  const row = document.createElement("tr");
  row.dataset.row = `data-row-${index}`;

  const bankId = document.createElement("td");
  bankId.textContent = bank.bankId;
  row.appendChild(bankId);

  const bankName = document.createElement("td");
  bankName.textContent = bank.name;
  row.appendChild(bankName);

  // Count customers for the current bank
  const customerCount = seed.customers.filter(
    (c) => c.bankId === bank.bankId,
  ).length;
  const customersCell = document.createElement("td");
  customersCell.textContent = customerCount;
  row.appendChild(customersCell);

  // Count accounts for the current bank
  const accountCount = seed.accounts.filter(
    (a) => a.bankId === bank.bankId,
  ).length;
  const accountsCell = document.createElement("td");
  accountsCell.textContent = accountCount;
  row.appendChild(accountsCell);

  banksTable.appendChild(row);
});

const customersTable = document.querySelector(".customers-table tbody");

customersTable.innerHTML = "";

seed.customers.forEach((customer) => {
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

  const bankId = document.createElement("td");
  bankId.textContent = customer.bankId;
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
