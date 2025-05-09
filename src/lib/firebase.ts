
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

// Check if all necessary Firebase config values are present and valid strings
const allConfigPresent = firebaseConfig.apiKey && typeof firebaseConfig.apiKey === 'string' &&
                         firebaseConfig.authDomain && typeof firebaseConfig.authDomain === 'string' &&
                         firebaseConfig.projectId && typeof firebaseConfig.projectId === 'string' &&
                         firebaseConfig.storageBucket && typeof firebaseConfig.storageBucket === 'string' &&
                         firebaseConfig.messagingSenderId && typeof firebaseConfig.messagingSenderId === 'string' &&
                         firebaseConfig.appId && typeof firebaseConfig.appId === 'string';

if (allConfigPresent) {
  if (!getApps().length) {
    try {
      const initializedApp = initializeApp(firebaseConfig);
      app = initializedApp;
      // Initialize Firestore and Auth only if app initialization was successful
      if (app) {
        try {
          db = getFirestore(app);
        } catch (e) {
          console.error("Error initializing Firestore:", e);
          db = null; // Ensure db is null on error
        }
        try {
          auth = getAuth(app);
        } catch (e) {
          console.error("Error initializing Auth:", e);
          auth = null; // Ensure auth is null on error
        }
      }
      if (app && db && auth) {
        console.log("Firebase initialized successfully.");
      } else {
        console.warn("Firebase app initialized, but Firestore or Auth failed to initialize.");
      }
    } catch (error) {
      console.error("Firebase app initialization error:", error);
      // app, db, auth will remain null if initializeApp fails
      app = null;
      db = null;
      auth = null;
    }
  } else {
    const existingApp = getApp();
    app = existingApp;
    // Attempt to get Firestore and Auth instances if app already exists
    try {
      db = getFirestore(existingApp);
    } catch (error) {
      console.error("Firestore initialization error (getApp):", error);
      db = null;
    }
    try {
      auth = getAuth(existingApp);
    } catch (error) {
      console.error("Auth initialization error (getApp):", error);
      auth = null;
    }
  }
} else {
  console.warn(
    "Firebase configuration is incomplete or invalid. Firebase functionalities (Auth, Firestore) will be disabled. " +
    "Please provide all Firebase environment variables in .env.local if you intend to use Firebase."
  );
  // Ensure app, db, auth are null if config is not present
  app = null;
  db = null;
  auth = null;
}

export { app, db, auth };
