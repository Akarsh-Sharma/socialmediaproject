// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // we added these to add google auth to our app
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8lHCTDAo8wDNp646Myx0fo-8C0uo4L8k",
  authDomain: "socialmediaproject-e4ade.firebaseapp.com",
  projectId: "socialmediaproject-e4ade",
  storageBucket: "socialmediaproject-e4ade.appspot.com",
  messagingSenderId: "501256004641",
  appId: "1:501256004641:web:9eb4595a9fe2da23972f60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();