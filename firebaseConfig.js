
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtXJnU6U8qCV791UiMGQi7lqnYSLnDhjk",
  authDomain: "daleelagency.firebaseapp.com",
  databaseURL: "https://daleelagency-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "daleelagency",
  storageBucket: "daleelagency.appspot.com",
  messagingSenderId: "298942454081",
  appId: "1:298942454081:web:3b22a1ec21c5b8ba68a9c0",
  measurementId: "G-WEBD4092PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Function to sign in
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Signed in successfully');
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

// Export the necessary components
export { database, ref, set, signIn,auth };
