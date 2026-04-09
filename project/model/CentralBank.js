import {Role} from "./Role.js";

export class CentralBank extends Role {
    constructor() {
        super("Central_bank");
    }

    hasPermission(action) {
        return true; // has permission for everything
    }
}