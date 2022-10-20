// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhCUCQ4I3tI7kFosRNdHUJ087gBb1HoBI",
  authDomain: "netflix-clone-4cf13.firebaseapp.com",
  projectId: "netflix-clone-4cf13",
  storageBucket: "netflix-clone-4cf13.appspot.com",
  messagingSenderId: "233831902461",
  appId: "1:233831902461:web:57a4783c3faf378e07a294",
  measurementId: "G-SE4XY56BBY",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
