
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const settingsFormSchema = z.object({
    storeName: z.string().min(1, 'Store name is required.'),
    supportEmail: z.string().email('Invalid email address.'),
    twitterUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
    facebookUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
    instagramUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
    freeShippingThreshold: z.coerce.number().min(0),
    flatRate: z.coerce.number().min(0),
    allowCod: z.boolean().default(false),
    stripeApiKey: z.string().optional(),
    razorpayApiKey: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            storeName: 'VSTRADERS',
            supportEmail: 'support@vstraders.com',
            twitterUrl: '#',
            facebookUrl: '#',
            instagramUrl: '#',
            freeShippingThreshold: 4000,
            flatRate: 150,
            allowCod: true,
            stripeApiKey: '',
            razorpayApiKey: '',
            metaTitle: 'VSTRADERS - Your One-Stop Shop',
            metaDescription: 'Discover the best products at VSTRADERS. Quality and affordability in one place.',
            metaKeywords: 'ecommerce, online shopping, products, deals',
        },
    });

    function onSubmit(data: SettingsFormValues) {
        toast({
            title: 'Settings Saved',
            description: 'Your settings have been updated successfully.',
        });
        console.log(data);
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button onClick={form.handleSubmit(onSubmit)}>Save Changes</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="general" className="w-full">
                <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="social">Social Links</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                <Card>
                    <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                        Manage your store's basic information.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="storeName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="supportEmail"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Support Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="social">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media</CardTitle>
                            <CardDescription>
                                Manage your store's social media profile links.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="twitterUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Twitter URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://twitter.com/your-profile" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="facebookUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Facebook URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://facebook.com/your-page" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagramUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Instagram URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://instagram.com/your-profile" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="shipping">
                <Card>
                    <CardHeader>
                    <CardTitle>Shipping Settings</CardTitle>
                    <CardDescription>
                        Configure your shipping rates and zones.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={form.control}
                            name="freeShippingThreshold"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Free Shipping Threshold (₹)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>Set the order amount above which shipping is free.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="flatRate"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Flat Shipping Rate (₹)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>The standard shipping cost for orders below the threshold.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="payments">
                <Card>
                    <CardHeader>
                    <CardTitle>Payment Gateways</CardTitle>
                    <CardDescription>
                        Connect and manage your payment providers.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <FormField
                            control={form.control}
                            name="allowCod"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Allow Cash on Delivery (COD)</FormLabel>
                                    <FormDescription>Enable or disable COD as a payment option.</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stripeApiKey"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Stripe API Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="pk_test_..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="razorpayApiKey"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Razorpay API Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="rzp_test_..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="seo">
                <Card>
                    <CardHeader>
                    <CardTitle>Global SEO Settings</CardTitle>
                    <CardDescription>
                        Optimize your store for search engines. These can be overridden on a per-product basis.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>The title that appears in browser tabs and search engine results.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>A brief summary of your store for search engines.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="metaKeywords"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Meta Keywords</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Comma-separated keywords relevant to your store.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
        </form>
      </Form>
    </div>
  );
}
