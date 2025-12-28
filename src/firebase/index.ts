'use client';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAnalytics, type Analytics } from "firebase/analytics";
import { firebaseConfig } from './config';
import { useUser } from '@/hooks/use-user';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let analytics: Analytics | undefined;

function initializeFirebase() {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(firebaseApp);
    }
  } else {
    firebaseApp = getApp();
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    if (typeof window !== 'undefined') {
        if (!analytics) {
            analytics = getAnalytics(firebaseApp);
        }
    }
  }
  return { firebaseApp, auth, firestore, analytics };
}

export { initializeFirebase, useUser };
export * from './provider';
