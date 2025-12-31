
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { BlogPost } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

    const docRef = doc(firestore, 'blogPosts', postId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const publishedAt = data.publishedAt instanceof Timestamp 
              ? data.publishedAt.toDate() 
              : new Date();

          const postData: BlogPost = {
            id: docSnap.id,
            title: data.title || '',
            author: data.author || 'Anonymous',
            date: publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: data.excerpt || '',
            content: data.content || '',
            imageUrl: data.imageUrl || '',
            imageAlt: data.imageAlt || data.title || '',
            featured: data.featured || false,
            seoTitle: data.seoTitle,
            seoMetaDescription: data.seoMetaDescription,
            publishedAt: data.publishedAt,
            updatedAt: data.updatedAt,
          };
          setPost(postData);
        } else {
          setPost(null);
          setError(new Error('Blog post not found'));
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
