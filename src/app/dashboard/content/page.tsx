
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const contentFormSchema = z.object({
  heroTitle: z.string(),
  heroTagline: z.string(),
  heroImageUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
  heroButtonLink: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
  aboutStory: z.string(),
  aboutMission: z.string(),
  aboutVision: z.string(),
  aboutBannerUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
});

export default function ContentPage() {
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      heroTitle: 'Discover Your Style',
      heroTagline: 'Explore our curated collection of the finest products, designed for the modern lifestyle.',
      heroImageUrl: "https://picsum.photos/seed/hero/1800/800",
      heroButtonLink: "/products",
      aboutStory: `Founded in 2023, VSTRADERS started with a simple idea: to make high-quality, comfortable, and stylish home essentials accessible to everyone. We noticed a gap in the market for affordable luxury in pillows, cushions, mattresses, and covers. What began as a small workshop has grown into a beloved brand, known for its dedication to quality craftsmanship and customer satisfaction.\n\nOur journey is one of passion for comfort and design. We believe that a comfortable home is a happy home, and every product we create is a testament to this philosophy. We source the finest materials and pay meticulous attention to detail to ensure that every item we sell brings lasting comfort and joy to our customers.`,
      aboutMission: `To enhance everyday living by providing superior comfort and style through our thoughtfully designed home essentials, ensuring every customer finds their perfect piece for a better night's sleep and a more beautiful home.`,
      aboutVision: `To be the leading and most trusted brand in home comfort, continuously innovating and inspiring our customers to create spaces where they can truly relax, recharge, and live their best lives.`,
      aboutBannerUrl: 'https://picsum.photos/seed/about-hero/1800/400',
    },
  });

  function onSubmit(values: z.infer<typeof contentFormSchema>) {
    console.log(values);
    toast({
      title: 'Content Updated',
      description: 'Your website content has been successfully updated.',
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
             <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
        </div>
      
      <Tabs defaultValue="homepage" className="w-full">
        <TabsList>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <Form {...form}>
            <form>
                <TabsContent value="homepage">
                <Card>
                    <CardHeader>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>
                        Manage the content displayed on your homepage.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <FormField
                            control={form.control}
                            name="heroTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Hero Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="heroTagline"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Hero Tagline</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="heroImageUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Hero Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/hero-image.jpg" {...field} />
                                </FormControl>
                                <FormDescription>Enter the full URL for the hero banner image.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="heroButtonLink"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Hero Button Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="/products" {...field} />
                                </FormControl>
                                <FormDescription>Enter the destination URL for the main call-to-action button (e.g., /products).</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="about">
                 <Card>
                    <CardHeader>
                    <CardTitle>About Us Page</CardTitle>
                    <CardDescription>
                        Manage the content for your "About Us" page.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="aboutBannerUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>About Page Banner Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/about-banner.jpg" {...field} />
                                </FormControl>
                                <FormDescription>Enter the full URL for the banner image on the About Us page.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutStory"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Our Story</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[200px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutMission"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Our Mission</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aboutVision"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Our Vision</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="policies">
                <Card>
                    <CardHeader>
                    <CardTitle>Policies</CardTitle>
                    <CardDescription>
                        Manage content for Privacy Policy and Terms & Conditions.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Policy management will be available here.</p>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="faq">
                <Card>
                    <CardHeader>
                    <CardTitle>FAQ</CardTitle>
                    <CardDescription>
                        Manage Frequently Asked Questions.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">FAQ management will be available here.</p>
                    </CardContent>
                </Card>
                </TabsContent>
            </form>
        </Form>
      </Tabs>
    </div>
  );
}
