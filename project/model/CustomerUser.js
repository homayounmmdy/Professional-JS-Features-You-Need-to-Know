import {Role} from "./Role";

export class CustomerUser extends Role {
    constructor(customerId) {
        super("customer");
        this.customerId = customerId;
    }

    hasPermission(action) {
        const allowed = [
            "view_my_accounts",
            "deposit",
            "withdraw",
            "transfer"
        ]
        return allowed.includes(action);
    }
}