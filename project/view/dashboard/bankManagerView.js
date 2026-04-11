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

document.addEventListener("indexedDBReady", loadPageData);

async function loadPageData() {
  const bankId = storedUser.roleObject.bankId;

  // Fetch from IDB
  const customers = await window.getCustomersFromDB();
  const accounts = await window.getAccountsFromDB();

  const customersTable = document.querySelector(".customers-table tbody");
  customersTable.innerHTML = "";

  customers
    .filter((c) => c.bankId === bankId)
    .forEach((customer) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${customer.customerId}</td>
        <td>${customer.firstName} ${customer.lastName}</td>
        <td>${customer.dob}</td>
      `;

      customersTable.appendChild(row);
    });

  const accountsTable = document.querySelector(".accounts-table tbody");
  accountsTable.innerHTML = "";

  accounts
    .filter((a) => a.bankId === bankId)
    .forEach((account) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${account.accountNumber}</td>
        <td>${account.balance}</td>
        <td>${account.customerId}</td>
      `;

      accountsTable.appendChild(row);
    });
}
