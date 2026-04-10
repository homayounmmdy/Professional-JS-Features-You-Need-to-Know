export class Role {
  constructor() {
    this.permissions = [];
  }

  hasPermission(action) {
    return this.permissions.includes(action);
  }
}
