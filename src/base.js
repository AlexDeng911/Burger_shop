import reBase from "re-base";
import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7FheKXY1NOHZ9M9h7DHmuvhSK8gN1-mE",
    authDomain: "burger-shop-849d4.firebaseapp.com",
    databaseURL: "https://burger-shop-849d4-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = reBase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;