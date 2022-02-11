import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCWHH0ZL8ZVNn9VcKQGQ5gHmEdCvbd4a0E",
    authDomain: "hanababy-d0a49.firebaseapp.com",
    databaseURL: "https://hanababy-d0a49-default-rtdb.firebaseio.com",
    projectId: "hanababy-d0a49",
    storageBucket: "hanababy-d0a49.appspot.com",
    messagingSenderId: "600330747110",
    appId: "1:600330747110:web:7bb10ee6926ca5ff0bcf27",
    measurementId: "G-PQLSK1E8RR"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export { auth, database };