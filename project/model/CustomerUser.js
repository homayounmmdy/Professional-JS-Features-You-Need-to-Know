import {Role} from "./Role.js";

export class CustomerUser extends Role {
    constructor(customerId) {
        super();
        this.role = "customer";
        this.customerId = customerId;
        this.permissions = [
            "view_my_accounts",
            "deposit",
            "withdraw",
            "transfer"
        ]
    }
}