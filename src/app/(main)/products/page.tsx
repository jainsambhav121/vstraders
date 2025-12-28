
'use client';

import { useState, useMemo } from 'react';
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
import { Button } from '@/components/ui/button';
import { List, Grid, Filter, SlidersHorizontal } from 'lucide-react';
import ProductListItem from '@/components/product-list-item';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import FilterSidebar from '@/components/filter-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating-desc';

export default function ProductsPage() {
  const [layout, setLayout] = useState('grid');
  const { products, loading } = useProducts();

  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 10000],
    sizes: [] as string[],
    ratings: [] as number[],
    availability: false,
  });

  const uniqueSizes = useMemo(() => {
    const allSizes = products.flatMap(p => p.variants.map(v => v.size).filter(Boolean));
    return [...new Set(allSizes)] as string[];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.category));
    }

    // Price range filter
    filtered = filtered.filter(
      p => p.finalPrice >= filters.priceRange[0] && p.finalPrice <= filters.priceRange[1]
    );

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p =>
        p.variants.some(v => v.size && filters.sizes.includes(v.size))
      );
    }
    
    // Rating filter
    if (filters.ratings.length > 0) {
        filtered = filtered.filter(p => filters.ratings.includes(Math.floor(p.rating)));
    }

    // Availability filter
    if (filters.availability) {
        filtered = filtered.filter(p => p.stock > 0);
    }

    // Sorting
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.finalPrice - b.finalPrice;
        case 'price-desc':
          return b.finalPrice - a.finalPrice;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          // Assuming createdAt is a Firestore timestamp or similar
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        default:
          return 0;
      }
    });
  }, [products, filters, sortOption]);

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
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Browse our full collection of premium comfort products.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Desktop Filters */}
        <div className="hidden md:block">
            <FilterSidebar 
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                uniqueSizes={uniqueSizes}
            />
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2">
                 {/* Mobile Filter Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-3/4">
                         <FilterSidebar 
                            filters={filters}
                            setFilters={setFilters}
                            categories={categories}
                            uniqueSizes={uniqueSizes}
                        />
                    </SheetContent>
                </Sheet>
                 <p className="text-sm text-muted-foreground">{filteredAndSortedProducts.length} Products</p>
             </div>
             
            <div className="flex items-center gap-4">
                 <Select onValueChange={(value) => setSortOption(value as SortOption)} defaultValue={sortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating-desc">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden md:flex items-center gap-2">
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
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {Array.from({ length: 9 }).map((_, i) => (
                 <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
              ))}
            </div>
          ) : (
            <>
              {layout === 'grid' ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductListItem key={product.id} product={product} />
                    ))}
                  </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
