const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.roleObject) {
  window.location.href = window.location.origin + "/project/view/login.html";
}

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user");
  console.log(window.location.origin);
  window.location.href = window.location.origin + "/project/view/login.html";
});

document.addEventListener("indexedDBReady", loadPageData);

async function loadPageData() {
  // Fetch from IDB
  const banks = await window.getBanksFromDB();
  const customers = await window.getCustomersFromDB();
  const accounts = await window.getAccountsFromDB();

  const banksTable = document.querySelector(".banks-table tbody");
  banksTable.innerHTML = "";

  banks.forEach((bank) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${bank.bankId}</td>
        <td>${bank.name}</td>
        <td>${customers.filter((c) => c.bankId === bank.bankId).length}</td>
        <td>${accounts.filter((a) => a.bankId === bank.bankId).length}</td>
      `;

    banksTable.appendChild(row);
  });

  const customersTable = document.querySelector(".customers-table tbody");
  customersTable.innerHTML = "";

  customers.forEach((customer) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${customer.customerId}</td>
        <td>${customer.firstName} ${customer.lastName}</td>
        <td>${customer.dob}</td>
        <td>${customer.bankId}</td>
      `;

    customersTable.appendChild(row);
  });

  const accountsTable = document.querySelector(".accounts-table tbody");
  accountsTable.innerHTML = "";

  accounts.forEach((account) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${account.accountNumber}</td>
        <td>${account.balance}</td>
        <td>${account.customerId}</td>
        <td>${account.bankId}</td>
      `;

    accountsTable.appendChild(row);
  });
}
