import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYuo9Jvb8u73s7m5Bhxkz_ktN-StdyYiM",
  authDomain: "csci3100-d7aeb.firebaseapp.com",
  projectId: "csci3100-d7aeb",
  storageBucket: "csci3100-d7aeb.appspot.com",
  messagingSenderId: "779427322879",
  appId: "1:779427322879:web:f2585d91c928b8c1bca5ca",
  measurementId: "G-KXFVPYE0ZD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };