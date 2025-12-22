
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const usersCollection = collection(firestore, 'users');
    const usersQuery = query(usersCollection);

    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        const usersData: User[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            isActive: data.isActive,
            role: data.role,
            // Mock data for fields not in Firestore
            avatar: `https://i.pravatar.cc/150?u=${doc.id}`,
            totalSpent: data.totalSpent || 0, 
            orderCount: data.orderCount || 0,
            createdAt: data.createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString(),
          };
        });
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error: ", err);
        const permissionError = new FirestorePermissionError({
          path: usersCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return { users, loading, error };
}
