
import { firestore } from '@/firebase/client-provider';
import { collection, getDocs } from 'firebase/firestore';
import ProductDetailPageClient from './client-page';


// This function tells Next.js which paths to pre-render at build time.
export async function generateStaticParams() {
  // NOTE: This uses a client-side singleton for the build process.
  // This is not ideal for server-side rendering and might be unstable.
  // A proper implementation would use the Firebase Admin SDK.
  if (!firestore) {
    console.warn("Firestore not initialized during build for generateStaticParams. Skipping product page generation.");
    return [];
  }
  try {
    const productsCol = collection(firestore, 'products');
    const productSnapshot = await getDocs(productsCol);
    const products = productSnapshot.docs.map(doc => ({ id: doc.id }));
    return products;
  } catch (error) {
    console.error("Failed to generate static params for products:", error);
    return [];
  }
}

export default function ProductDetailPage() {
  return <ProductDetailPageClient />;
}
