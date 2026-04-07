import {test3} from "./script3.js";

console.log("I'm Script 2");
test3();

export default {
    name : "Script 2",
    test : function () {
        console.log("I'm Script 2");
    }
}