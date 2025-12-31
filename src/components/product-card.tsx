

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Truck } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/context/wishlist-context';
import { cn } from '@/lib/utils';
import React from 'react';
import { Badge } from './ui/badge';

type ProductCardProps = {
  product: Product;
};

const FREE_SHIPPING_THRESHOLD = 4000;

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = !!wishlist.find(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
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
  
  const discountAmount = product.basePrice - product.finalPrice;
  const showDiscount = discountAmount > 0;

  return (
    <Card className="flex h-full flex-col group/card overflow-hidden">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
        <CardHeader className="p-0 relative">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={product.primaryImage || 'https://placehold.co/600x600'}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                data-ai-hint="product image"
              />
            </div>
          <div className="absolute top-2 left-2 flex flex-col gap-2">
              {showDiscount && (
                  <Badge variant="destructive">
                      {product.discount?.type === 'percentage' 
                          ? `${product.discount.value}% OFF`
                          : `₹${product.discount?.value} OFF`
                      }
                  </Badge>
              )}
              {product.status.isNew && (
                  <Badge variant="secondary" className="bg-blue-500 text-white">NEW</Badge>
              )}
              {product.status.isBestSeller && (
                  <Badge variant="secondary" className="bg-yellow-500 text-white">BESTSELLER</Badge>
              )}
          </div>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"
            onClick={handleWishlistToggle}
            aria-label="Toggle Wishlist"
          >
            <Heart className={cn("h-4 w-4", isInWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <CardTitle className="mb-1 text-sm md:text-base leading-tight md:leading-tight">
              {product.name}
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
           {product.finalPrice > FREE_SHIPPING_THRESHOLD && (
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <Truck className="h-4 w-4" />
                  <span>Free Shipping</span>
              </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex flex-col">
              <p className="text-base font-semibold md:text-lg">₹{product.finalPrice.toFixed(2)}</p>
              {showDiscount && (
                  <div className="flex items-center gap-2 text-xs">
                      <p className="text-muted-foreground line-through">₹{product.basePrice.toFixed(2)}</p>
                      <p className="font-semibold text-green-600">Save ₹{discountAmount.toFixed(2)}</p>
                  </div>
              )}
          </div>
          <Button 
            onClick={handleAddToCart} 
            size="sm" 
            className="shrink-0"
          >
              <ShoppingCart className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Add to Cart</span>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
