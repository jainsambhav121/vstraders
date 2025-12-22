
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const settingsFormSchema = z.object({
    storeName: z.string().min(1, 'Store name is required.'),
    supportEmail: z.string().email('Invalid email address.'),
    twitterUrl: z.string().url().or(z.literal('')),
    facebookUrl: z.string().url().or(z.literal('')),
    instagramUrl: z.string().url().or(z.literal('')),
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
                    <p className="text-muted-foreground">Shipping configuration options will be available here.</p>
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
                    <p className="text-muted-foreground">Payment gateway integrations will be available here.</p>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="seo">
                <Card>
                    <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                    <CardDescription>
                        Optimize your store for search engines.
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                    <p className="text-muted-foreground">SEO settings will be available here.</p>
                    </CardContent>
                </Card>
                </TabsContent>
            </Tabs>
        </form>
      </Form>
    </div>
  );
}
