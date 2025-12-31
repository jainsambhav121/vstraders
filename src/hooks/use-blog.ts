
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { BlogPost } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { mapDocToBlogPost } from '@/lib/data-mappers';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const blogCollection = collection(firestore, 'blogPosts');
    const blogQuery = query(blogCollection, orderBy('publishedAt', 'desc'));

    const unsubscribe = onSnapshot(
      blogQuery,
      (snapshot) => {
        try {
          const postsData: BlogPost[] = snapshot.docs.map(mapDocToBlogPost);
          setPosts(postsData);
        } catch (e: any) {
          setError(new Error('Failed to parse blog post data.'));
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Firestore error fetching blog posts: ", err);
        const permissionError = new FirestorePermissionError({
          path: blogCollection.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore]);

  return { posts, loading, error };
}
