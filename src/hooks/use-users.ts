
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { mapDocToUser } from '@/lib/data-mappers';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const usersCollection = collection(firestore, 'users');
    const usersQuery = query(usersCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        try {
            const usersData: User[] = snapshot.docs.map(mapDocToUser);
            setUsers(usersData);
        } catch (e: any) {
            setError(new Error("Failed to parse user data."));
            console.error(e);
        } finally {
            setLoading(false);
        }
      },
      (err) => {
        console.error("Firestore error fetching users: ", err);
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
