
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

export default function AboutPage() {
  return (
    <div className="flex-1">
      <div className="relative h-64 w-full bg-primary/10">
        <Image
          src="https://picsum.photos/seed/about-hero/1800/400"
          alt="About VSTRADERS"
          fill
          className="object-cover"
          data-ai-hint="team working"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            About VSTRADERS
          </h1>
          <p className="mt-2 text-lg text-primary-foreground/90">
            Crafting comfort for your home.
          </p>
        </div>
      </div>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2023, VSTRADERS started with a simple idea: to make high-quality, comfortable, and stylish home essentials accessible to everyone. We noticed a gap in the market for affordable luxury in pillows, cushions, mattresses, and covers. What began as a small workshop has grown into a beloved brand, known for its dedication to quality craftsmanship and customer satisfaction.
                </p>
                <p>
                  Our journey is one of passion for comfort and design. We believe that a comfortable home is a happy home, and every product we create is a testament to this philosophy. We source the finest materials and pay meticulous attention to detail to ensure that every item we sell brings lasting comfort and joy to our customers.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  To enhance everyday living by providing superior comfort and style through our thoughtfully designed home essentials, ensuring every customer finds their perfect piece for a better night's sleep and a more beautiful home.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                     Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  To be the leading and most trusted brand in home comfort, continuously innovating and inspiring our customers to create spaces where they can truly relax, recharge, and live their best lives.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <Building className="h-6 w-6 text-primary" />
                   Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p>Ashok Kutir, J-3/48, Arvind Nagar, Yamuna Vihar, Shahdara, New Delhi, Delhi, 110053</p>
                </div>
                 <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p>vstrader418@gmail.com</p>
                </div>
                 <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p>+91 7217619150</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
