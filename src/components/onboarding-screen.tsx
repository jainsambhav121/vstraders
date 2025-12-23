
'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingBag, Tag, Truck } from 'lucide-react';

const onboardingSlides = [
  {
    icon: ShoppingBag,
    title: 'Welcome to VSTRADERS!',
    description:
      'Discover a wide range of high-quality products, from home essentials to the latest gadgets.',
    image: 'https://picsum.photos/seed/onboarding1/800/1200',
    imageHint: 'online shopping',
  },
  {
    icon: Tag,
    title: 'Exclusive Deals',
    description:
      'Get access to special discounts and offers available only in our app.',
    image: 'https://picsum.photos/seed/onboarding2/800/1200',
    imageHint: 'special offer sale',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description:
      'Enjoy fast and reliable shipping on all your orders, delivered right to your doorstep.',
    image: 'https://picsum.photos/seed/onboarding3/800/1200',
    imageHint: 'delivery truck speed',
  },
];

type OnboardingScreenProps = {
  onComplete: () => void;
};

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-background">
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {onboardingSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden">
                  <CardContent className="relative flex aspect-[9/16] flex-col items-center justify-end p-6 text-center text-white">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      data-ai-hint={slide.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-4 rounded-full bg-primary/80 p-4 backdrop-blur-sm">
                        <slide.icon className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <h2 className="mb-2 font-headline text-3xl font-bold">
                        {slide.title}
                      </h2>
                      <p className="max-w-xs text-base text-primary-foreground/90">
                        {slide.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <Button onClick={onComplete} className="absolute bottom-20 z-20">
        Get Started
      </Button>
    </div>
  );
}
