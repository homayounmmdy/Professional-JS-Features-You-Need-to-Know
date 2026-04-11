const storedUser = JSON.parse(localStorage.getItem("user"));

if (!storedUser || !storedUser.roleObject) {
  window.location.href = window.location.origin + "/project/view/login.html";
}

document.querySelector(".logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user");
  console.log(window.location.origin);
  window.location.href = window.location.origin + "/project/view/login.html";
});

// --- Modal functionality ---
const editBankModal = document.getElementById("editBankModal");
const closeButton = editBankModal.querySelector(".close-button");
const editBankForm = document.getElementById("editBankForm");
const editBankIdInputContainer = document.getElementById("editBankIdContainer"); // Assuming you'll wrap the input in a div
const editBankIdInput = document.getElementById("editBankId");
const editBankNameInput = document.getElementById("editBankName");

// Function to open the modal
function openEditBankModal(bank) {
  // Set the values for the input fields
  editBankIdInput.value = bank.bankId;
  editBankNameInput.value = bank.name;

  // Make the bankId input read-only and display it
  editBankIdInput.readOnly = true;
  // If you want to hide the label and input entirely for editing,
  // you could hide the container instead:
  // editBankIdInputContainer.style.display = 'none';

  editBankModal.style.display = "block";
}

// Function to close the modal
function closeEditBankModal() {
  editBankModal.style.display = "none";
  editBankForm.reset();
  // Reset the readOnly property when closing the modal, in case it's reused for adding
  editBankIdInput.readOnly = false;
  // If you hid the container, make it visible again:
  // if(editBankIdInputContainer) editBankIdInputContainer.style.display = '';
}

// Close modal when clicking the close button
closeButton.addEventListener("click", closeEditBankModal);

// Close modal if clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === editBankModal) {
    closeEditBankModal();
  }
});

// --- Form submission for editing ---
editBankForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve the values from the form
  const bankIdToUpdate = editBankIdInput.value; 
  const newBankName = editBankNameInput.value;

  // Basic validation
  if (!bankIdToUpdate || !newBankName) {
    alert("Please provide all bank details.");
    return;
  }
  
  const updatedBankData = {
    name: newBankName,
  };

  try {
    // Call your IndexedDB update function
    await window.updateBankInDB(bankIdToUpdate, updatedBankData);

    alert("Bank updated successfully!");
    closeEditBankModal();
    loadPageData(); 
  } catch (error) {
    console.error("Error updating bank:", error);
    alert("Failed to update bank. Please try again.");
  }
});

document.addEventListener("indexedDBReady", loadPageData);

async function loadPageData() {
  // Fetch from IndexedDB
  const banks = await window.getBanksFromDB();
  const customers = await window.getCustomersFromDB();
  const accounts = await window.getAccountsFromDB();

  // ============================
  // BANKS TABLE
  // ============================
  const banksTable = document.querySelector(".banks-table tbody");
  banksTable.innerHTML = ""; 

  banks.forEach((bank) => {
    const row = document.createElement("tr");

    // Bank ID Cell
    const bankIdCell = document.createElement("td");
    bankIdCell.textContent = bank.bankId;
    row.appendChild(bankIdCell);

    // Bank Name Cell
    const bankNameCell = document.createElement("td");
    bankNameCell.textContent = bank.name;
    row.appendChild(bankNameCell);

    // Count customers of this bank
    const customerCount = customers.filter(
      (c) => c.bankId === bank.bankId
    ).length;
    const customersCell = document.createElement("td");
    customersCell.textContent = customerCount;
    row.appendChild(customersCell);

    // Count accounts of this bank
    const accountCount = accounts.filter(
      (a) => a.bankId === bank.bankId
    ).length;
    const accountsCell = document.createElement("td");
    accountsCell.textContent = accountCount;
    row.appendChild(accountsCell);

    const actionsCell = document.createElement("td");
    actionsCell.classList.add("actions-column"); 

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.dataset.bankId = bank.bankId;
    editButton.dataset.bankName = bank.name;

    editButton.addEventListener("click", () => {
      openEditBankModal(bank);
    });

    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);

    banksTable.appendChild(row);
  });

  // ============================
  // CUSTOMERS TABLE 
  // ============================
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

  // ============================
  // ACCOUNTS TABLE 
  // ============================
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