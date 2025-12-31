
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { BlogPost } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { mapDocToBlogPost } from '@/lib/data-mappers';

export function useBlogPost(postId: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !postId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const docRef = doc(firestore, 'blogPosts', postId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          try {
            const postData = mapDocToBlogPost(docSnap);
            setPost(postData);
          } catch(e: any) {
             setError(new Error('Failed to parse blog post data.'));
             console.error(e);
          }
        } else {
          setPost(null);
          // Don't set an error here, the `notFound()` function should be used in the component
        }
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error fetching single blog post: ", err);
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, postId]);

  return { post, loading, error };
}
