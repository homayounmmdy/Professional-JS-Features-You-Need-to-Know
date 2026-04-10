import Account from "./Account.js";
import Customer from "./Customer.js";
let nextCustomerId = 1;

class Bank {
  constructor(name, bankName) {
    this.bankName = bankName;
    this.name = name;
    this.customers = {};
    this.accounts = {};
  }

  createCustomer(firstName, lastName, dob, bankId) {
    const customerId = "C" + nextAccountNumber++;
    const newCustomer = new Customer(
      customerId,
      firstName,
      lastName,
      dob,
      bankId,
    );
    this.customers[customerId] = newCustomer;
    console.log(
      `Customer ${newCustomer.getFullName()} created with ID: ${customerId}`,
    );
    return newCustomer;
  }

  createAccount(customerId, initialBalance = 0) {
    const customer = this.customers[customerId];
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found in this bank.`);
    }
    const accountNumber = Math.floor(1000 + Math.random() * 9000); // شماره حساب تصادفی
    const newAccount = new Account(
      accountNumber,
      customerId,
      balance,
      this.bankId,
    );
    this.accounts[accountNumber] = newAccount;
    console.log(
      `Account ${accountNumber} created for customer ${customerId} with initial balance ${initialBalance}.`,
    );
    return newAccount;
  }

  getCustomerById(customerId) {
    return this.customers[customerId] || null;
  }

  getCustomers() {
    return Object.values(this.customers) || null;
  }

  getAccounts() {
    return Object.values(this.accounts) || null;
  }

  findAccountByNumber(accountNumber) {
    return this.accounts[accountNumber] || null;
  }

  displayAllCustomers() {
    console.log(`\n-- All Customers at ${this.bankName} ---`);
    for (const id in this.customers) {
      this.customers[id].displayInfo();
      console.log("---");
    }
    console.log("-------------------------------");
  }

  displayAllAccounts() {
    console.log(`\n--- All Account at ${this.bankName} ---`);
    for (const num in this.accounts) {
      this.accounts[num].displayInfo();
      console.log("---");
    }
    console.log("-------------------------------");
  }

  getCustomerByBankId() {
    return Object.values(this.customers);
  }
}

export default Bank;
