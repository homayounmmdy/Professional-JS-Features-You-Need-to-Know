import Account from "./Account.js";
import Customer from "./Customer.js";

class Bank {
  constructor(bankName) {
    this.bankName = bankName;
    this.customers = {};
    this.accounts = {};
    this.nextCustomerId = 1;
    this.nextAccountNumber = 1001;
  }

  createCustomer(firstName, lastName, dob) {
    const customerId = `C${this.nextAccountNumber++}`;
    const newCustomer = new Customer(customerId, firstName, lastName, dob);
    this.customers[customerId] = newCustomer;
    console.log(
      `Customer ${newCustomer.getFullName()} created with ID: ${customerId}`,
    );
    return newCustomer;
  }

  createAccount(customerId, initialBalance = 0) {
    if (!this.customers[customerId]) {
      console.log(`Error: Customer with ID ${customerId} not found`);
      return null;
    }
    const accountNumber = `${this.nextAccountNumber++}`;
    const newAccount = new Account(accountNumber, initialBalance, customerId);
    this.accounts[accountNumber] = newAccount;
    this.customers[customerId].addAccount(newAccount);
    console.log(
      `Account ${accountNumber} created for customer ${customerId} with initial balance ${initialBalance}.`,
    );
    return newAccount;
  }

  findCustomerById(customerId) {
    return this.customers[customerId] || null;
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
