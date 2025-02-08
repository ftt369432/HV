import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function initFirebase() {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    // Initialize Firestore with modern cache config
    const db = initializeFirestore(app, {
      cache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    });

    return { app, auth, db };
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
}

export const { app, auth, db } = initFirebase();
