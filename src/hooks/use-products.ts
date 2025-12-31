
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Product } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { mapDocToProduct } from '@/lib/data-mappers';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const productsCollection = collection(firestore, 'products');
    // We only fetch products that are enabled to be shown on the website
    const productsQuery = query(productsCollection, where('status.isEnabled', '==', true));

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        try {
          const productsData: Product[] = snapshot.docs.map(mapDocToProduct);
          setProducts(productsData);
        } catch (e: any) {
          setError(new Error('Failed to parse product data.'));
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        const permissionError = new FirestorePermissionError({
          path: productsCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return { products, loading, error };
}
