import Bank from "./Bank";

const myBank = new Bank("Awesome Bank");

const customer1 = myBank.createCustomer("Alice", "Smith" ,"1990-05-15");
const customer2 = myBank.createCustomer("Bob", "Johnson" ,"1985-11-20");

myBank.displayAllCustomers();