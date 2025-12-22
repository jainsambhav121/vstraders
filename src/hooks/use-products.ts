
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Product } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      return;
    }

    const productsCollection = collection(firestore, 'products');
    const productsQuery = query(productsCollection);

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const productsData: Product[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const finalPrice = data.discount 
            ? data.discount.type === 'percentage' 
              ? data.price * (1 - data.discount.value / 100) 
              : data.price - data.discount.value 
            : data.price;
            
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            finalPrice,
            category: data.category,
            images: data.images || [],
            primaryImageIndex: data.primaryImageIndex || 0,
            stock: data.stock,
            variants: data.variants || [],
            isFeatured: data.isFeatured,
            isBestSeller: data.isBestSeller,
            isEnabled: data.isEnabled,
            seoTitle: data.seoTitle,
            seoMetaDescription: data.seoMetaDescription,
            seoKeywords: data.seoKeywords || [],
            slug: data.slug,
            sku: data.sku,
            rating: data.rating || 0,
            reviewCount: data.reviewCount || 0,
          };
        });
        setProducts(productsData);
        setLoading(false);
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
