// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUOwC7rcgWrIDGGcPXRkINgPsqEAdHRv4",
  authDomain: "connectink-739cb.firebaseapp.com",
  projectId: "connectink-739cb",
  storageBucket: "connectink-739cb.appspot.com",
  messagingSenderId: "599626523772",
  appId: "1:599626523772:web:95c16299f3f145193395f9",
  measurementId: "G-TQSV8NZT9Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
