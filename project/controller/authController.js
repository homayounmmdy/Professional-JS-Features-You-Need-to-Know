import {seed} from "../data/seed.js";
import {CentralBank} from "../model/CentralBank.js";
import {BankManager} from "../model/BankManager.js";
import {CustomerUser} from "../model/CustomerUser.js";

export class AuthController {
    login(username , password){
        const user = seed.users.find(
            u => u.username === username && u.password === password
        );

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        let roleObject;

        if(user.role === "central_bank" ) {
            roleObject = new CentralBank();
        }
        else if (user.role === "bank_manager" ) {
            roleObject = new BankManager(user.bankId);
        }
        else if (user.role === "customer") {
            roleObject = new CustomerUser(user.customerId);
        }

        return {
            username : user.username,
            role : user.role,
            roleObject
        }
    }
}