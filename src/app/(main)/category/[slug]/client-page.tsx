
'use client';

import { useProducts } from '@/hooks/use-products';
import { categories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { notFound, useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPageClient() {
  const params = useParams();
  const { slug } = params;
  const { products, loading } = useProducts();
  const category = categories.find((c) => c.slug === slug);

  // This check is important and should happen after loading is complete
  if (!loading && !category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold capitalize">
          {category?.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{category?.description}</p>
      </div>

      {loading ? (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
              </div>
          ))}
        </div>
      ) : categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="mt-2 text-muted-foreground">
            There are no products available in this category at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
