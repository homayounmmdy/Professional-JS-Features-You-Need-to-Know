import Bank from "../model/Bank.js";

export class BankController {
    constructor() {
        this.bank = new Bank("My Bank");
    }

    createCustomer(userRole ,formData) {
        if (!userRole.hasPermission("create_customer")) {
            throw new Error("Access Denied Permission");
        }

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

    getCustomers(userRole , bankId) {
        if (!userRole.hasPermission("view_bank_customers")) {
            throw new Error("Access Denied Permission");
        }

        return this.bank.getCustomerByBankId(bankId);
    }
}