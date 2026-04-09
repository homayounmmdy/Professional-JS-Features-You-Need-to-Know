import Bank from "../model/Bank.js";

export class BankController {
    constructor() {
        this.bank = new Bank("My Bank");
    }

    createCustomer(formData) {
        return this.bank.createCustomer(
            formData.firstName,
            formData.lastName,
            formData.dob
        )
    }

    createAccount(customerId, balance) {
        return this.bank.createAccount(customerId , balance)
    }

    getAllCustomers() {
        return Object.values(this.bank.customers);
    }
}