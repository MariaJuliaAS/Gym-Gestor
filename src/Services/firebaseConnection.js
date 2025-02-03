import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtyedhh_ezxpBsMRsN1bJgGly8SCg5BSU",
    authDomain: "gym-gestor-48f90.firebaseapp.com",
    projectId: "gym-gestor-48f90",
    storageBucket: "gym-gestor-48f90.firebasestorage.app",
    messagingSenderId: "404285909179",
    appId: "1:404285909179:web:a751b941bd1510d7bf619e",
    measurementId: "G-MK2JJ42CCF"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

export { auth, db };

