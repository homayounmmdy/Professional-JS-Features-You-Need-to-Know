export class Role {
    constructor(roleName) {
        this.roleName = roleName;
    }

    hasPermission(action) {
        return false; // No permission
    }
}