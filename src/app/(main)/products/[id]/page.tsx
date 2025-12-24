
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { reviews } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === params.id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-6 w-1/3 mb-8" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                <Skeleton className="aspect-square w-full" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
    )
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="aspect-square">
           <Image
              src={product.primaryImage || ''}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full rounded-lg object-cover"
              data-ai-hint="product image"
            />
        </div>

        <div>
          <h1 className="font-headline text-3xl font-bold lg:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-muted stroke-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold">₹{product.finalPrice.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <div className="mt-8">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>Add to Cart</Button>
          </div>

          <div className="mt-8 space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <p>Free shipping on orders over ₹4000</p>
            </div>
             <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <p>In Stock & Ready to Ship</p>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <p>1-Year Manufacturer Warranty</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-6 space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/150?u=${review.customerName}`} />
                <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                   <h4 className="font-semibold">{review.customerName}</h4>
                   <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                 <div className="mt-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground fill-muted'}`} />
                    ))}
                 </div>
                <h5 className="mt-2 font-semibold">{review.title}</h5>
                <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       <Separator className="my-12" />

      <div>
        <h2 className="mb-6 text-center font-headline text-3xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
