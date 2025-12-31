
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Order } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { mapDocToOrder } from '@/lib/data-mappers';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const ordersCollection = collection(firestore, 'orders');
    // Order by creation date in descending order to get the newest orders first
    const ordersQuery = query(ordersCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        try {
          const ordersData: Order[] = snapshot.docs.map(mapDocToOrder);
          setOrders(ordersData);
        } catch (e: any) {
            setError(new Error("Failed to parse order data."));
            console.error(e);
        } finally {
            setLoading(false);
        }
      },
      (err) => {
        console.error("Firestore error fetching orders: ", err);
        const permissionError = new FirestorePermissionError({
          path: ordersCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return { orders, loading, error };
}
