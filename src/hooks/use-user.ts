
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/firebase';
import type { AuthenticatedUser } from '@/lib/types';

export function useUser() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    // If auth is not yet available, we are in a loading state.
    if (!auth) {
      // Keep loading true until auth is initialized.
      // This check might be redundant if the provider ensures auth is always passed,
      // but it's a good safeguard.
      setLoading(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
