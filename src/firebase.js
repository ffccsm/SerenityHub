import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Import the auth module

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKFB3ruOuyJTHx5LxEkyxVAonB7rt03ho",
  authDomain: "serenity-form.firebaseapp.com",
  projectId: "serenity-form",
  storageBucket: "serenity-form.appspot.com",
  messagingSenderId: "981044454981",
  appId: "1:981044454981:web:04bbe622d420ef826b252c",
  measurementId: "G-6CVEQN819D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);  // Initialize authentication

export { db, auth };
