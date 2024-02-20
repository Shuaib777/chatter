import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chatter-80e4e.firebaseapp.com",
  projectId: "chatter-80e4e",
  storageBucket: "chatter-80e4e.appspot.com",
  messagingSenderId: "583505007051",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const database = getDatabase(app);
export const refdb = ref;
