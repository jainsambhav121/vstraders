

'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
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
    const productsQuery = query(productsCollection, where('status.isEnabled', '==', true));

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const productsData: Product[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          let finalPrice = data.basePrice || 0;
          if (data.discount && data.discount.value > 0 && data.basePrice) {
            if (data.discount.type === 'percentage') {
              finalPrice = data.basePrice * (1 - data.discount.value / 100);
            } else if (data.discount.type === 'flat') {
              finalPrice = data.basePrice - data.discount.value;
            }
          }
            
          return {
            id: doc.id,
            name: data.name || '',
            description: data.description || '',
            brand: data.brand || '',
            basePrice: data.basePrice || 0,
            finalPrice: finalPrice,
            discount: data.discount,
            category: data.category || '',
            stock: data.stock || 0,
            images: data.images || [],
            primaryImage: data.primaryImage,
            videoUrl: data.videoUrl,
            variants: data.variants || [],
            details: data.details || [],
            status: data.status || { isEnabled: true, isFeatured: false, isBestSeller: false, isNew: false },
            seo: data.seo || { slug: doc.id },
            rating: data.rating || 0,
            reviewCount: data.reviewCount || 0,
            productName: data.name || '',
            specifications: data.details || [],
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
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
