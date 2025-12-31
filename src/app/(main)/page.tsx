

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { ArrowRight, Tag, Truck, Check } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useProducts } from '@/hooks/use-products';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useDoc } from '@/hooks/use-doc';
import { cn } from '@/lib/utils';
import type { HeroSlide } from '@/lib/types';
import { useRecentlyViewed } from '@/context/recently-viewed-context';

export default function HomePage() {
  const { products, loading: productsLoading } = useProducts();
  const { data: content, loading: contentLoading } = useDoc<any>('homepageContent/main');
  const { recentlyViewed } = useRecentlyViewed();
  
  const featuredProducts = products.filter(p => p.status.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.status.isNew).slice(0, 8);
  const trendingProducts = products.filter(p => p.status.isBestSeller).slice(0, 8);
  const recentlyViewedProducts = products.filter(p => recentlyViewed.includes(p.id));


  const heroSlides: HeroSlide[] = content?.heroSlides || [];

  const loading = productsLoading || contentLoading;

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <section className="relative h-[50vh] min-h-[400px] w-full bg-primary/10">
        {loading ? (
           <Skeleton className="h-full w-full" />
        ) : (
          <Carousel
            className="w-full h-full"
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[50vh] min-h-[400px] w-full block">
                    <Image
                      src={slide.imageUrl || "https://picsum.photos/seed/hero/1800/800"}
                      alt={slide.title || "Promotional banner"}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      data-ai-hint="promotional banner"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                      <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        {slide.title || 'Discover Your Style'}
                      </h1>
                      <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
                        {slide.tagline || 'Explore our curated collection of the finest products, designed for the modern lifestyle.'}
                      </p>
                      <Button size="lg" className="mt-8 animate-in fade-in zoom-in-90 duration-1000 delay-400" asChild>
                        <Link href={slide.buttonLink || "/products"}>Shop Now</Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
          </Carousel>
        )}
      </section>

      <div className="container mx-auto px-4">
        <section>
          <h2 className="mb-2 text-center font-headline text-3xl font-bold">
            Shop by Category
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Explore our categories to find the perfect bedding products for your comfort needs.
          </p>
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                  <CarouselItem key={category.id} className="basis-1/2" asChild>
                     <Link
                        href={`/category/${category.slug}`}
                        className="group flex flex-col items-center justify-center gap-2 text-center"
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-card transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-8 w-8 text-accent-foreground group-hover:text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-card-foreground">
                          {category.name}
                        </span>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </Link>
                  </CarouselItem>
                  )
                })}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid md:grid-cols-4 lg:grid-cols-4 md:gap-6 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="group flex flex-col items-center justify-center gap-2 text-center"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-card transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-10 w-10 text-accent-foreground group-hover:text-primary-foreground" />
                </div>
                <span className="font-semibold text-card-foreground">
                  {category.name}
                </span>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Link>
            )})}
          </div>
        </section>

        <section className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="mb-2 text-center font-headline text-3xl font-bold">
            Featured Products
          </h2>
          <p className="mb-6 text-center text-muted-foreground max-w-2xl mx-auto">
            Our best-selling products are trusted by customers across India for their comfort, quality, and affordability. These bedding essentials are ideal for daily home use as well as commercial requirements.
          </p>
          {loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
                ))}
              </div>
          ) : (
            <Carousel
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
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
          )}
        </section>

        {loading ? (
            <Skeleton className="mt-12 md:mt-16 lg:mt-20 h-48 w-full rounded-lg" />
        ) : content?.saleBannerIsActive ? (
            <section className="mt-12 md:mt-16 lg:mt-20">
              <div className={cn(
                  "rounded-lg p-8 md:p-12 relative overflow-hidden",
                  !content.saleBannerImageUrl && "bg-accent"
              )}>
                {content.saleBannerImageUrl && (
                  <>
                    <Image
                      src={content.saleBannerImageUrl}
                      alt={content.saleBannerTitle || 'Sale banner'}
                      fill
                      className="object-cover"
                      data-ai-hint="sale banner"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </>
                )}
                <div className={cn(
                  "relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row",
                   content.saleBannerImageUrl && "text-white"
                )}>
                  <div className="text-center md:text-left">
                    <h3 className={cn(
                      "font-headline text-2xl font-bold md:text-3xl",
                      content.saleBannerImageUrl ? "text-white" : "text-accent-foreground"
                    )}>
                      {content.saleBannerTitle || 'Summer Sale is Here!'}
                    </h3>
                    <p className={cn(
                      "mt-2",
                      content.saleBannerImageUrl ? "text-primary-foreground/80" : "text-accent-foreground/80"
                    )}>
                      {content.saleBannerSubtitle || "Get up to 40% off on selected items. Don't miss out!"}
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={content.saleBannerLink || '/sale'}>
                      View Deals <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
        ) : null}

        <section className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="mb-6 text-center font-headline text-3xl font-bold">
            Trending Now
          </h2>
          {loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
                ))}
              </div>
          ) : (
            <Carousel
              opts={{ align: 'start', loop: trendingProducts.length > 4 }}
              className="w-full"
            >
              <CarouselContent>
                {trendingProducts.map((product) => (
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
          )}
        </section>
        
        <section className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="mb-2 text-center font-headline text-3xl font-bold">
            New Arrivals
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Stay updated with our latest mattresses, pillows, and cushions, designed to offer improved comfort, modern materials, and better durability.
          </p>
          {loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-8 w-1/4" />
                  </div>
                ))}
              </div>
          ) : (
            <Carousel
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {newArrivals.map((product) => (
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
          )}
        </section>

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

        <section className="mt-12 rounded-lg bg-muted/50 py-12 md:mt-16 lg:mt-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold">
              Why Choose VSTRADER?
            </h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Premium quality materials</h4>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Affordable pricing without compromise</h4>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Suitable for homes, hotels, hostels & PGs</h4>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Tested for comfort and durability</h4>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Fast delivery across India</h4>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Dedicated customer support</h4>
                </div>
              </div>
            </div>
            <p className="mt-8 text-center text-lg font-medium text-foreground">
              At VSTRADERS, your comfort is our priority
            </p>
          </div>
        </section>

        <section className="mt-12 border-t py-12 md:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                <div className="flex flex-col items-center">
                    <Truck className="h-10 w-10 text-primary" />
                    <h4 className="mt-4 text-lg font-semibold">Free Shipping</h4>
                    <p className="mt-1 text-muted-foreground">On all orders over ₹4000</p>
                </div>
                <div className="flex flex-col items-center">
                    <Tag className="h-10 w-10 text-primary" />
                    <h4 className="mt-4 text-lg font-semibold">Weekly Deals</h4>
                    <p className="mt-1 text-muted-foreground">New discounts every week</p>
                </div>
                <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    <h4 className="mt-4 text-lg font-semibold">Quality Guaranteed</h4>
                    <p className="mt-1 text-muted-foreground">Top-tier products, guaranteed</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
