import { BankController } from "../controller/bankController.js";

const bankCtrl = new BankController();

document.querySelector("#createCustomerBtn").addEventListener("click", () => {
  let firstNameEL = document.querySelector("#first");
  let lastNameEL = document.querySelector("#last");
  let dobEL = document.querySelector("#dob");

  bankCtrl.createCustomer({ firstName: firstNameEL.value, lastName : lastNameEL.value, dob : dobEL.value });

  updateCustomerList();

  firstNameEL.value = "";
  lastNameEL.value = "";
  dobEL.value = ""
});

function updateCustomerList() {
    const list = bankCtrl.getAllCustomers();
    const div = document.querySelector("#customerList");

    div.innerHTML = list.map(c => `
        <div class="customer">    
            <b>${c.getFullName()}</b><br/>
            CustomerId : ${c.customerId}
        </div>
    `).join("")
}