// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCU990MLJtA_LNdU1Mdi_pDDJnBlLWEQWk",
  authDomain: "chatter-80e4e.firebaseapp.com",
  projectId: "chatter-80e4e",
  storageBucket: "chatter-80e4e.appspot.com",
  messagingSenderId: "583505007051",
  appId: "1:583505007051:web:b0abe9cc1f11a42161e64e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
