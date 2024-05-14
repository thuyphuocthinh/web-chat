// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnVa1VoPPr2cXQdn4BXjTnD1EWbK2LlgA",
  authDomain: "reactchat-505f9.firebaseapp.com",
  projectId: "reactchat-505f9",
  storageBucket: "reactchat-505f9.appspot.com",
  messagingSenderId: "176089162700",
  appId: "1:176089162700:web:62ee20785c73f0a350f369",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export auth
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
