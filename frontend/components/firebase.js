import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYuo9Jvb8u73s7m5Bhxkz_ktN-StdyYiM",
  authDomain: "csci3100-d7aeb.firebaseapp.com",
  projectId: "csci3100-d7aeb",
  storageBucket: "csci3100-d7aeb.appspot.com",
  messagingSenderId: "779427322879",
  appId: "1:779427322879:web:f2585d91c928b8c1bca5ca",
  measurementId: "G-KXFVPYE0ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(app);
export {app, auth, db, storage };