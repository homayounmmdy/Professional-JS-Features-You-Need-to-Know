export const seed = {
  users: [
    {
      username: "central",
      password: "0909",
      role: "central_bank",
    },
    {
      username: "bankAmanager",
      password: "1111",
      role: "bank_manager",
      bankId: "B1",
    },
    {
      username: "mohammad",
      password: "1234",
      role: "customer",
      customerId: "C1",
    },
  ],
  banks: [
    {
      bankId: "B1",
      name: "American Express",
    },
    {
      bankId: "B2",
      name: "JP Morgan",
    },
  ],
  customers: [
    {
      customerId: "C1",
      firstName: "Mohammad",
      lastName: "Ahmadi",
      dob: "1990-01-01",
      bankId: "B1",
    },
    {
      customerId: "C2",
      firstName: "Alex",
      lastName: "Hermon",
      dob: "1999-10-21",
      bankId: "B2",
    },
    {
      customerId: "C3",
      firstName: "Tomas",
      lastName: "Shelby",
      dob: "2009-05-11",
      bankId: "B1",
    },
  ],
  accounts: [
    {
      accountNumber: 1001,
      balance: 5_000,
      customerId: "C1",
      bankId: "B1",
    },
    {
      accountNumber: 1002,
      balance: 2,
      customerId: "C2",
      bankId: "B2",
    },
    {
      accountNumber: 1003,
      balance: 1_000_000,
      customerId: "C3",
      bankId: "B1",
    },
    {
      accountNumber: 1003,
      balance: 100,
      customerId: "C3",
      bankId: "B1",
    },
  ],
};
