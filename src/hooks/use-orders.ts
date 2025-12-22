
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Order } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      // Don't do anything if firestore is not initialized
      return;
    }

    const ordersCollection = collection(firestore, 'orders');
    const ordersQuery = query(ordersCollection);

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const ordersData: Order[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          let orderDate = '';
          if (data.createdAt && data.createdAt instanceof Timestamp) {
            orderDate = data.createdAt.toDate().toLocaleDateString();
          } else if (data.date) {
            orderDate = data.date;
          }

          return {
            id: doc.id,
            customerName: data.customerDetails?.name || 'N/A',
            customerEmail: data.customerDetails?.email || 'N/A',
            date: orderDate,
            total: data.totalAmount || 0,
            status: data.orderStatus || 'Pending',
            items: data.products?.length || 0,
            paymentStatus: data.paymentStatus || 'Pending',
          };
        });
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error: ", err);
        const permissionError = new FirestorePermissionError({
          path: ordersCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firestore]);

  return { orders, loading, error };
}
