
'use client';

import { useWishlist } from '@/context/wishlist-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductCard from '@/components/product-card';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>The items you love, all in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
              <Heart className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
              <p className="text-muted-foreground">
                Looks like you haven't added anything to your wishlist yet.
              </p>
              <Button asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
