// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwzj5Lz9H1OCmq55SFd1osFgi3fDLx-3U",
  authDomain: "smarttalent-c7713.firebaseapp.com",
  projectId: "smarttalent-c7713",
  storageBucket: "smarttalent-c7713.appspot.com",
  messagingSenderId: "682180426226",
  appId: "1:682180426226:web:52e22811368d2728b3536b",
  measurementId: "G-LK4M3701SQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(firebaseApp);
