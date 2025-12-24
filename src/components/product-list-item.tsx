
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <Link href={`/products/${product.id}`} className="block flex-shrink-0">
          <div className="aspect-square w-24 overflow-hidden rounded-md">
            <Image
              src={product.primaryImage || 'https://placehold.co/100x100'}
              alt={product.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
              data-ai-hint="product image"
            />
          </div>
        </Link>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold leading-tight">
              <Link href={`/products/${product.id}`} className="hover:text-primary">
                {product.name}
              </Link>
            </h3>
            <div className="mt-1 flex items-center gap-1">
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
          </div>
          <div className="mt-2 flex items-center justify-between">
             <p className="text-lg font-semibold">₹{product.finalPrice.toFixed(2)}</p>
             <Button size="sm" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
