import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGJ18L-UYHwzY_Ju4JDVue4jUGbc8Wnxg",
  authDomain: "wordcloud-67a86.firebaseapp.com",
  projectId: "wordcloud-67a86",
  storageBucket: "wordcloud-67a86.firebasestorage.app",
  messagingSenderId: "579846529917",
  appId: "1:579846529917:web:e0d7611a12130c9636e214"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
