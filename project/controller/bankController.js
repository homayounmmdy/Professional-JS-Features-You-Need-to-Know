let centralBankSystemInstance;

export function setCentralBankSystem(instance) {
  centralBankSystemInstance = instance;
}
export class BankController {
  constructor() {
    if (!centralBankSystemInstance) {
      throw new Error("CentralBankSystem is not initialized!");
    }
    this.centralBankSystem = centralBankSystemInstance;
  }

  createCustomer(userRole, formData) {
    if (!userRole.hasPermission("create_customer")) {
      throw new Error("Access Denied Permission");
    }
    const bank = this.centralBankSystem.getBankById(userRole.bankId);
    if (!bank) {
      throw new Error(`Bank with ID ${userRole.bankId} not found.`);
    }

    return bank.createCustomer(
      formData.firstName,
      formData.lastName,
      formData.dob,
      userRole.bankId,
    );
  }

  createAccount(customerId, balance) {
    return this.bank.createAccount(customerId, balance);
  }

  getAllCustomers() {
    let allCustomers = [];
    for (const bankId in this.centralBankSystem.banks) {
      const bank = this.centralBankSystem.banks[bankId];
      allCustomers.push(...bank.getCustomers());
    }
    return allCustomers;
  }

  getCustomers(userRole, bankId) {
    if (!userRole.hasPermission("view_bank_customers")) {
      throw new Error("Access Denied Permission");
    }

    if (userRole.bankId !== bankId) {
      if (userRole.role !== "central_bank") {
        throw new Error(
          "Access Denied: You can only view customers of your own bank.",
        );
      }
    }

    const bank = this.centralBankSystem.getBankById(bankId);
    if (!bank) {
      throw new Error(`Bank with ID ${bankId} not found.`);
    }

    return bank.getCustomers();
  }
}
