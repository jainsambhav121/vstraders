import { categories } from '@/lib/data';
import CategoryPageClient from './client-page';

// This function tells Next.js which paths to pre-render at build time.
// It is a server-side function and cannot be in a 'use client' file.
export async function generateStaticParams() {
  // In a real app, you might fetch these from a database.
  // For now, we use the static categories array.
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage() {
  return <CategoryPageClient />;
}
