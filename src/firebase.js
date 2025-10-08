// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa o Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXGFJsSbzsf06d7eX5pQ2geKtZxauI47s",
  authDomain: "inpi-project-81848.firebaseapp.com",
  projectId: "inpi-project-81848",
  storageBucket: "inpi-project-81848.firebasestorage.app",
  messagingSenderId: "198000814391",
  appId: "1:198000814391:web:acab45039514d5390812b2",
  measurementId: "G-7HMXXKNX63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // Exporta a instância do Firestore