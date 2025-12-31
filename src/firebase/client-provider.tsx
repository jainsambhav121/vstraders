
'use client';

import React from 'react';
import { initializeFirebase, FirebaseProvider } from '@/firebase';
import type { Firestore } from 'firebase/firestore';

// Export firestore instance for use in server-side generation functions
export let firestore: Firestore | null = null;

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, auth, firestore: fs } = initializeFirebase();
  firestore = fs; // Assign to the exported variable

  return (
    <FirebaseProvider firebaseApp={firebaseApp} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
