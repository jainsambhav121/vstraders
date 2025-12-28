
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Define a type for your settings for better type safety
export type Settings = {
    storeName: string;
    supportEmail: string;
    twitterUrl: string;
    facebookUrl: string;
    instagramUrl: string;
    freeShippingThreshold: number;
    flatRate: number;
    allowCod: boolean;
    stripeApiKey: string;
    razorpayApiKey: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    shippingPolicy: string;
    privacyPolicy: string;
    termsAndConditions: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const docRef = doc(firestore, 'settings', 'main');

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data() as Settings);
        } else {
          setSettings(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error: ", err);
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firestore]);

  return { settings, loading, error };
}
