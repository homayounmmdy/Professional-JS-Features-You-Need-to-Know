export const seed = {
  "users": [
    {
      "username" : "central",
      "password" : "0909",
      "role" : "central_bank"
    },
    {
      "username" : "bankAmanager",
      "password" : "1111",
      "role" : "bank_manager",
      "bankId" : "B1"
    },
    {
      "username" : "mohammad",
      "password" : "1234",
      "role" : "customer",
      "customerId" : "C1"
    }
  ],
  "banks" : [
    {
      "bankId" : "B1",
      "name" : "American Express"
    },
    {
      "bankId" :"B2",
      "name" : "JP Morgan"
    }
  ],
  "customers": [
    {
      "customerId" : "C1",
      "firstName" : "Mohammad",
      "lastName" : "Ahmadi",
      "dob" : "1990-01-01",
      "bankId": "B1"
    }
  ],
  "accounts": [
    {
      "accountNumber" : 1001,
      "balance" : 5000,
      "customerId" : "C1",
      "bankId" : "B1"
    }
  ]
}