
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
          
          let finalPrice = data.basePrice;
          if (data.discount && data.discount.value > 0) {
            if (data.discount.type === 'percentage') {
              finalPrice = data.basePrice * (1 - data.discount.value / 100);
            } else if (data.discount.type === 'flat') {
              finalPrice = data.basePrice - data.discount.value;
            }
          }
            
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            brand: data.brand,
            basePrice: data.basePrice,
            finalPrice: finalPrice || data.basePrice,
            discount: data.discount,
            category: data.category,
            stock: data.stock,
            images: data.images || [],
            primaryImage: data.primaryImage,
            variants: data.variants || [],
            status: data.status || { isEnabled: true, isFeatured: false, isBestSeller: false },
            seo: data.seo || {},
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

