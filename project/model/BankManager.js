import {Role} from "./Role";

export class BankManager extends Role{
    constructor(bankId) {
        super("bank_manager");
        this.bankId = bankId;
    }

    hasPermission(action) {
        const allowed = [
            "view_bank_customers",
            "view_bank_accounts",
            "create_account",
            "create_customer"
        ];
        return allowed.includes(action);
    }
}