

'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, Timestamp, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { BlogPost } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const blogCollection = collection(firestore, 'blogPosts');
    const blogQuery = query(blogCollection, orderBy('publishedAt', 'desc'));

    const unsubscribe = onSnapshot(
      blogQuery,
      (snapshot) => {
        const postsData: BlogPost[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const publishedAt = data.publishedAt instanceof Timestamp 
              ? data.publishedAt.toDate() 
              : new Date();
              
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            author: data.author,
            date: publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: data.excerpt,
            content: data.content,
            imageUrl: data.imageUrl,
            imageAlt: data.imageAlt,
            featured: data.featured || false,
            seoTitle: data.seoTitle,
            seoMetaDescription: data.seoMetaDescription,
            publishedAt: data.publishedAt,
            updatedAt: data.updatedAt,
          };
        });
        setPosts(postsData);
        setLoading(false);
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
