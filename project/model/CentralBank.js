import {Role} from "./Role";

export class CentralBank extends Role {
    constructor() {
        super("Central_bank");
    }

    hasPermission(action) {
        return true; // has permission for everything
    }
}