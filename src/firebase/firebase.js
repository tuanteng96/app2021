import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBOuJ19sg_yuRvrNZ5wo6rW8uGylsnVkws",
    authDomain: "cser-d0ce7.firebaseapp.com",
    databaseURL: "https://cser-d0ce7.firebaseio.com",
    projectId: "cser-d0ce7",
    storageBucket: "cser-d0ce7.appspot.com",
    messagingSenderId: "1087460686681",
    appId: "1:1087460686681:web:fb69e74a33702584",
    measurementId: "G-Z6EVBSQEJ4"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export { auth, database };