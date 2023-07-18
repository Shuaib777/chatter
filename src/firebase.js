import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

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
export const storage = getStorage();
export const database = getDatabase(app);
// export const db = getFirestore();
export const refdb = ref;
