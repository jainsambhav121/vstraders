
'use client';

import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, Building } from 'lucide-react';
import { useDoc } from '@/hooks/use-doc';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { data: content, loading } = useDoc<any>('homepageContent/main');
  
  const companyInfo = {
      address: 'Ashok Kutir, J-3/48, Arvind Nagar, Yamuna Vihar, Shahdara, New Delhi, Delhi, 110053',
      email: 'vstrader418@gmail.com',
      phone: '+91 7217619150'
  }

  return (
    <div className="flex-1 animate-in fade-in duration-500">
      {loading ? (
         <Skeleton className="relative h-64 w-full" />
      ) : (
        <div className="relative h-64 w-full bg-primary/10">
            <Image
              src={content?.aboutBannerUrl || "https://picsum.photos/seed/about-hero/1800/400"}
              alt="About VSTRADERS"
              fill
              className="object-cover"
              data-ai-hint="team working"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
              <h1 className="font-headline text-4xl font-bold md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
                About VSTRADERS
              </h1>
              <p className="mt-2 text-lg text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
                Crafting comfort for your home.
              </p>
            </div>
        </div>
      )}


      <div className="container mx-auto px-4 py-8 md:py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: content?.aboutStory?.replace(/\n/g, '<br />') || '' }} />
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    {loading ? <Skeleton className="h-16 w-full" /> : content?.aboutMission}
                </CardContent>
              </Card>
              <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                     Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                     {loading ? <Skeleton className="h-16 w-full" /> : content?.aboutVision}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-1">
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Building className="h-6 w-6 text-primary" />
                   Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p>{companyInfo.address}</p>
                </div>
                 <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p>{companyInfo.email}</p>
                </div>
                 <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p>{companyInfo.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
