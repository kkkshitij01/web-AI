// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "autocanvas-8b45c.firebaseapp.com",
  projectId: "autocanvas-8b45c",
  storageBucket: "autocanvas-8b45c.firebasestorage.app",
  messagingSenderId: "301190076698",
  appId: "1:301190076698:web:9ccdbb2763050e607334a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
