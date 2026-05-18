// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCS7U37lUt79To0AyOuqJ3l-EHorZ0-iO8",
    authDomain: "fleet-maintenance-app-89954.firebaseapp.com",
    projectId: "fleet-maintenance-app-89954",
    storageBucket: "fleet-maintenance-app-89954.firebasestorage.app",
    messagingSenderId: "328121433873",
    appId: "1:328121433873:web:1c5cb47be43db6480c96b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * =====================================================
 * EXPORTAR FIRESTORE
 * =====================================================
 */

export const db = getFirestore(app);

export const auth = getAuth(app);