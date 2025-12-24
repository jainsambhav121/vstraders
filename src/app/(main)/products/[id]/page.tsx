
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useProducts } from '@/hooks/use-products';
import { reviews } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, Truck, CheckCircle, ShieldCheck, Plus, Minus } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import React, { useState, useMemo, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { ProductVariant } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);


  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  useEffect(() => {
    if (product) {
        if (product.variants && product.variants.length > 0) {
            setSelectedVariant(product.variants[0]);
        } else {
            setSelectedVariant(null);
        }
        setActiveImage(product.primaryImage || (product.images.length > 0 ? product.images[0] : 'https://placehold.co/800x800'));
    }
  }, [product]);

  const displayPrice = useMemo(() => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price;
    }
    return product?.finalPrice;
  }, [selectedVariant, product]);

  const variantOptions = useMemo(() => {
    if (!product || !product.variants) return {};
    const options: Record<string, string[]> = {};
    product.variants.forEach(variant => {
      if (variant.size) {
        if (!options.size) options.size = [];
        if (!options.size.includes(variant.size)) options.size.push(variant.size);
      }
      if (variant.color) {
        if (!options.color) options.color = [];
        if (!options.color.includes(variant.color)) options.color.push(variant.color);
      }
       if (variant.material) {
        if (!options.material) options.material = [];
        if (!options.material.includes(variant.material)) options.material.push(variant.material);
      }
      if (variant.thickness) {
        if (!options.thickness) options.thickness = [];
        if (!options.thickness.includes(variant.thickness)) options.thickness.push(variant.thickness);
      }
    });
    return options;
  }, [product]);

  const handleVariantChange = (type: string, value: string) => {
    // This is a simplified approach. For complex variant logic, you'd need
    // to find the variant that matches all selected options.
    const newVariant = product?.variants.find(v => v[type as keyof ProductVariant] === value);
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };


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
    const variantInfo = selectedVariant ? Object.entries(variantOptions)
        .map(([key, values]) => selectedVariant[key as keyof ProductVariant])
        .filter(Boolean)
        .join(', ')
      : '';

    const productToAdd = {
        ...product,
        id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
        name: selectedVariant ? `${product.name} (${variantInfo})` : product.name,
        finalPrice: displayPrice || product.finalPrice,
        quantity: quantity,
    };
    addToCart(productToAdd);
    toast({
      title: "Added to cart",
      description: `${productToAdd.name} (x${quantity}) has been added to your cart.`,
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
        <div>
           <div className="aspect-square w-full overflow-hidden rounded-lg border">
               <Image
                  src={activeImage || 'https://placehold.co/800x800'}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                  data-ai-hint="product image"
                />
           </div>
           <div className="mt-4 grid grid-cols-5 gap-4">
                {product.images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(image)}
                        className={cn(
                            "overflow-hidden rounded-lg border-2 aspect-square",
                            activeImage === image ? 'border-primary' : 'border-transparent'
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            width={150}
                            height={150}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
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
          <p className="mt-4 text-3xl font-bold">₹{displayPrice?.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          {product.variants && product.variants.length > 0 && (
            <div className="mt-8 space-y-6">
                {Object.entries(variantOptions).map(([key, values]) => (
                    <div key={key}>
                        <h3 className="text-sm font-semibold capitalize mb-2">{key}</h3>
                        <RadioGroup
                            defaultValue={values[0]}
                            className="flex flex-wrap gap-2"
                            onValueChange={(value) => handleVariantChange(key, value)}
                        >
                            {values.map(value => (
                                <div key={value}>
                                    <RadioGroupItem value={value} id={`${key}-${value}`} className="sr-only" />
                                    <Label
                                        htmlFor={`${key}-${value}`}
                                        className="cursor-pointer rounded-md border px-4 py-2 hover:bg-accent data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                    >
                                        {value}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}
            </div>
          )}


          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
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

       {product.details && product.details.length > 0 && (
        <div className="my-12">
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {product.details.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-semibold">{detail.label}</TableCell>
                                    <TableCell>{detail.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
       )}

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

    