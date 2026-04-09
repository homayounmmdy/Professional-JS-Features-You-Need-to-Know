import Bank from "../model/Bank.js";

export class CentralBankSystem {
    constructor() {
        this.banks = {};
        this.nextBankId = 1;
    }

    createBank(name) {
        const bankId = "B" + this.nextBankId++;
        const bank = new Bank(name , bankId);
        this.banks[bankId] = bank;
        return bank;
    }

    getBankById(bankId) {
        return this.banks[bankId];
    }

    getAllBanks() {
        return Object.values(this.banks);
    }
}