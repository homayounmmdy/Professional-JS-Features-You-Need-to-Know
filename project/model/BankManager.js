import { Role } from "./Role.js";

export class BankManager extends Role {
  constructor(bankId) {
    super();
    this.role = "bank_manager";
    this.bankId = bankId;
    this.permissions = [
      "view_bank_customers",
      "view_bank_accounts",
      "create_account",
      "create_customer",
    ];
  }
}
