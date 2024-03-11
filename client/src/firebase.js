import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "walletwatch-fc5aa.firebaseapp.com",
  projectId: "walletwatch-fc5aa",
  storageBucket: "walletwatch-fc5aa.appspot.com",
  messagingSenderId: "683808814770",
  appId: "1:683808814770:web:5056a9b2f39e676feffbab",
};

export const app = initializeApp(firebaseConfig);
