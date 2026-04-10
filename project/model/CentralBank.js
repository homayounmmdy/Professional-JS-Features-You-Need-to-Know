import { Role } from "./Role.js";

export class CentralBank extends Role {
  constructor() {
    super();
    this.role = "central_bank";
    this.permissions = [
      "view_all_banks",
      "view_all_customers",
      "view_all_accounts",
      "create_bank",
      "create_customer",
      "view_bank_customers",
    ];
  }
}
