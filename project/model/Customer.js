class Customer {
    constructor(customerId, firstName , lastName , dob) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob; // Date Of Birth
        this.accounts = [];
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    addAccount(account) {
        this.accounts.push(account);
        console.log(`Account ${account.accountNumber} added to customer ${this.customerId}.`)
    }

    displayInfo() {
        console.log(`Customer ID: ${this.customerId}`);
        console.log(`Name: ${this.getFullName}`);
        console.log(`DOB: ${this.dob}`);
        console.log(`Number of Accounts: ${this.accounts.length}`);
    }
}

export default Customer;