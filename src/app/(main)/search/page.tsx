
'use client';

import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import ProductCard from '@/components/product-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, SortAsc } from 'lucide-react';
import { categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { useRecentlyViewed } from '@/context/recently-viewed-context';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading } = useProducts();
  const { recentlyViewed } = useRecentlyViewed();

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  
  const featuredProducts = products.filter(p => p.status.isFeatured).slice(0, 8);
  const recentlyViewedProducts = products.filter(p => recentlyViewed.includes(p.id));

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.finalPrice - b.finalPrice;
        case 'price-desc':
          return b.finalPrice - a.finalPrice;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [products, query, categoryFilter, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">
          Search Results
        </h1>
        {query && <p className="text-muted-foreground mt-2">Showing results for: "{query}"</p>}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setCategoryFilter(null)}>All Categories</DropdownMenuItem>
              {categories.map(cat => (
                <DropdownMenuItem key={cat.id} onSelect={() => setCategoryFilter(cat.slug)}>
                  {cat.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {categoryFilter && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {categories.find(c => c.slug === categoryFilter)?.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setCategoryFilter(null)}>Clear</Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
             <Select onValueChange={(value) => setSortOption(value as SortOption)} defaultValue={sortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name: A-Z</SelectItem>
                <SelectItem value="name-desc">Name: Z-A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-1/4" />
              </div>
          ))}
        </div>
      ) : filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No Products Found</h2>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any products matching your search.
          </p>
          
           <section className="mt-12 md:mt-16 lg:mt-20">
            <h2 className="mb-6 text-center font-headline text-3xl font-bold">
              Featured Products
            </h2>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 hidden md:flex" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 hidden md:flex" />
            </Carousel>
          </section>
        </div>
      )}

      {recentlyViewedProducts.length > 0 && (
          <section className="mt-12 md:mt-16 lg:mt-20">
            <h2 className="mb-6 text-center font-headline text-3xl font-bold">
              Recently Viewed
            </h2>
            <Carousel opts={{ align: 'start', loop: recentlyViewedProducts.length > 4 }} className="w-full">
              <CarouselContent>
                {recentlyViewedProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 hidden md:flex" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 hidden md:flex" />
            </Carousel>
          </section>
        )}
    </div>
  );
}
