'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { List, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductListItem from '@/components/product-list-item';

export default function ProductsPage() {
  const [layout, setLayout] = useState('grid');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-4xl font-bold">
          All Products
        </h1>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant={layout === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('grid')}
            aria-label="Grid View"
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button
            variant={layout === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setLayout('list')}
            aria-label="List View"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Mobile layout */}
      <div className="md:hidden">
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
