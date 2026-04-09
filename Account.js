class Account {
  #balance;
  #accountNumber;

  constructor(accountNumber, initialBalance = 0, customerId) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }
    this.#accountNumber = accountNumber;
    this.#balance = initialBalance;
    this.customerId = customerId;
    this.transactions = [];
  }

  getBalance() {
    return this.#balance;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }

  #checkToBePositive(value, type = "value") {
    if (value <= 0) {
      console.log(`${type} amount must be positive.`);
      return false;
    }
  }

  deposit(amount) {
    this.#checkToBePositive(amount, "Deposit");

    this.#balance += amount;
    this.transactions.push({
      type: "deposit",
      amount: amount,
      date: new Date(),
    });
    console.log(`Deposited ${amount}. New balance ${this.#balance}`);
    return true;
  }

  withdraw(amount) {
    this.#checkToBePositive(amount, "Withdrawal");

    if (amount > this.#balance) {
        console.log("Insufficient funds.");
        return false;
    }

    this.#balance -= amount;
    this.transactions.push({
        type : "withdraw",
        amount : amount,
        data : new Date()
    });
    console.log(`Withdrew ${amount}. New balance: ${this.#balance}`);
    return true;
  }

  displayInfo() {
    console.log(`Account Number: ${this.#accountNumber}`);
    console.log(`Owner Customer ID: ${this.customerId}`);
    console.log(`Current Balance: ${this.#balance}`);
    console.log(`Number of Transactions: ${this.transactions.length}`);
  }

  viwTransactions() {
    console.log(`--- Transactions for Account ${this.#accountNumber} ---`);
    if (this.transactions.length === 0) {
        console.log("No Transactions yet.");
        return;
    }
    this.transactions.forEach(tx => {
        console.log(`${tx.date.toISOString()} - ${tx.type}: ${tx.amount}`)
    });
    console.log("----------------------------------------")
  }
}

export default Account;