import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.images[0]?.url || ''}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="mb-1 text-lg leading-tight">
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
        <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
