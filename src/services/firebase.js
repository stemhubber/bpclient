import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBQE6CsCGwqyOiLmcUkOUcsgkJ0MS8W1Zc",
    authDomain: "order-sys-ba469.firebaseapp.com",
    projectId: "order-sys-ba469",
    storageBucket: "order-sys-ba469.firebasestorage.app",
    messagingSenderId: "1080021673289",
    appId: "1:1080021673289:web:ceb730ad4102e0bec42698"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
