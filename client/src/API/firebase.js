// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdtF0T9IwjBdXxG6N9MKHA_2PYLU75FXA",
  authDomain: "growup-mern-project.firebaseapp.com",
  projectId: "growup-mern-project",
  storageBucket: "growup-mern-project.appspot.com",
  messagingSenderId: "324645280235",
  appId: "1:324645280235:web:db3509e0311a471825a1ae",
  measurementId: "G-ZFZ994R24L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)