import mykey from "./KhaltiKey";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let config = {
    // replace this key with yours
    "publicKey": mykey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess (payload) {
            // const order = {
            //     amount:payload.amount,
            //     number:payload.mobile,
            //     product:JSON.parse(localStorage.getItem("cart")),
            //     user:localStorage.getItem("user")
            // }
            // localStorage.removeItem("cart")
            // localStorage.setItem("cart","[]")
            // toast("Payment sucessfully");
            // orderApi(order)
            // window.location.reload(false);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI"],
};

export default config;