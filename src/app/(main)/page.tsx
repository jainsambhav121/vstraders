
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { ArrowRight, Tag, Truck } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      <section className="relative h-[50vh] min-h-[400px] w-full bg-primary/10">
        <Image
          src="https://picsum.photos/seed/hero/1800/800"
          alt="Promotional banner"
          fill
          className="object-cover"
          priority
          data-ai-hint="promotional banner"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl font-bold md:text-5xl lg:text-6xl">
            Discover Your Style
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            Explore our curated collection of the finest products, designed for the modern lifestyle.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <section>
          <h2 className="mb-6 text-center font-headline text-3xl font-bold">
            Shop by Category
          </h2>
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="basis-1/2">
                     <Link
                        href={`/category/${category.slug}`}
                        className="group flex h-full flex-col items-center justify-center gap-2 border bg-card p-2 text-center transition-all hover:shadow-lg aspect-square"
                        style={{ borderRadius: '30px' }}
                      >
                        <div className="rounded-full bg-accent p-3 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Tag className="h-6 w-6 text-accent-foreground group-hover:text-primary-foreground" />
                        </div>
                        <span className="font-semibold text-card-foreground text-sm">
                          {category.name}
                        </span>
                      </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="group flex flex-col items-center justify-center gap-2 border bg-card p-4 text-center transition-all hover:shadow-lg aspect-square"
                style={{ borderRadius: '30px' }}
              >
                <div className="rounded-full bg-accent p-4 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Tag className="h-8 w-8 text-accent-foreground group-hover:text-primary-foreground" />
                </div>
                <span className="font-semibold text-card-foreground">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="mb-6 text-center font-headline text-3xl font-bold">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16 lg:mt-20">
          <div className="rounded-lg bg-accent p-8 md:p-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h3 className="font-headline text-2xl font-bold text-accent-foreground md:text-3xl">
                  Summer Sale is Here!
                </h3>
                <p className="mt-2 text-accent-foreground/80">
                  Get up to 40% off on selected items. Don't miss out!
                </p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/sale">View Deals <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="mt-12 md:mt-16 lg:mt-20">
          <h2 className="mb-6 text-center fontheadline text-3xl font-bold">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-12 border-t py-12 md:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                <div className="flex flex-col items-center">
                    <Truck className="h-10 w-10 text-primary" />
                    <h4 className="mt-4 text-lg font-semibold">Free Shipping</h4>
                    <p className="mt-1 text-muted-foreground">On all orders over $50</p>
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
