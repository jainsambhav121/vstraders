
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/context/wishlist-context';
import { cn } from '@/lib/utils';
import React from 'react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = !!wishlist.find(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevent navigation
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Removed from wishlist' });
    } else {
      addToWishlist(product);
      toast({ title: 'Added to wishlist' });
    }
  };

  return (
    <Card className="flex h-full flex-col group/card">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.primaryImage || 'https://placehold.co/600x600'}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="product image"
            />
          </div>
        </Link>
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-4 w-4", isInWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-1 text-sm md:text-base leading-tight md:leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-muted stroke-muted-foreground'}`}
                    />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-base font-semibold md:text-lg">₹{product.finalPrice.toFixed(2)}</p>
        <Button 
          onClick={handleAddToCart} 
          size="sm" 
          className="shrink-0 w-9 h-9 rounded-full p-0 md:w-auto md:h-9 md:px-3 md:rounded-md"
        >
            <ShoppingCart className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
