// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjII2lLLO6RF2y4-lrrbyplJmpa7LSk9o",
  authDomain: "alpha-1ede3.firebaseapp.com",
  projectId: "alpha-1ede3",
  storageBucket: "alpha-1ede3.firebasestorage.app",
  messagingSenderId: "501081614281",
  appId: "1:501081614281:web:ed4df4a2d7038316332a18",
  measurementId: "G-CZZ7E3YH5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
