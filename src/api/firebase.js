// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBkbMCFcEOegfzXlsjgmDBl2VvSuB8PhFM",
  authDomain: "linguaapp-4f849.firebaseapp.com",
  projectId: "linguaapp-4f849",
  storageBucket: "linguaapp-4f849.appspot.com",
  messagingSenderId: "478497509633",
  appId: "1:478497509633:web:c0a69f0506b0ba2a4a4b00"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export authentication
const auth = getAuth(app);

export { auth };
