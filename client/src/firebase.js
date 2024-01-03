// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "walletwatch-fc5aa.firebaseapp.com",
  projectId: "walletwatch-fc5aa",
  storageBucket: "walletwatch-fc5aa.appspot.com",
  messagingSenderId: "683808814770",
  appId: "1:683808814770:web:5056a9b2f39e676feffbab",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
