

'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Switch } from '@/components/ui/switch';

const faqItemSchema = z.object({
  question: z.string().min(1, 'Question cannot be empty.'),
  answer: z.string().min(1, 'Answer cannot be empty.'),
});

const contentFormSchema = z.object({
  heroTitle: z.string(),
  heroTagline: z.string(),
  heroImageUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
  heroButtonLink: z.string().or(z.literal('')),
  aboutStory: z.string(),
  aboutMission: z.string(),
  aboutVision: z.string(),
  aboutBannerUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')),
  faqs: z.array(faqItemSchema),
  saleBannerTitle: z.string().optional(),
  saleBannerSubtitle: z.string().optional(),
  saleBannerLink: z.string().optional(),
  saleBannerIsActive: z.boolean().default(false),
  saleBannerImageUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal('')).optional(),
});

export default function ContentPage() {
  const firestore = useFirestore();
  
  const form = useForm<z.infer<typeof contentFormSchema>>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      heroTitle: '',
      heroTagline: '',
      heroImageUrl: "",
      heroButtonLink: "",
      aboutStory: ``,
      aboutMission: ``,
      aboutVision: ``,
      aboutBannerUrl: '',
      faqs: [],
      saleBannerTitle: 'Summer Sale is Here!',
      saleBannerSubtitle: "Get up to 40% off on selected items. Don't miss out!",
      saleBannerLink: '/sale',
      saleBannerIsActive: true,
      saleBannerImageUrl: '',
    },
  });

  const { fields: faqFields, append: appendFaq, remove: removeFaq, replace: replaceFaqs } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  useEffect(() => {
    const fetchContent = async () => {
        if (!firestore) return;
        const docRef = doc(firestore, 'homepageContent', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            form.reset({
                ...form.formState.defaultValues,
                ...data,
            });
            if (data.faqs) {
                replaceFaqs(data.faqs);
            }
        }
    };
    fetchContent();
  }, [firestore, form, replaceFaqs]);


  async function onSubmit(values: z.infer<typeof contentFormSchema>) {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: 'Error',
            description: 'Firestore not available. Could not save content.',
        });
        return;
    }
    try {
        const docRef = doc(firestore, 'homepageContent', 'main');
        await setDoc(docRef, { ...values, updatedAt: serverTimestamp() }, { merge: true });
        toast({
            title: 'Content Updated',
            description: 'Your website content has been successfully updated.',
        });
    } catch (error) {
        console.error("Error updating content: ", error);
        toast({
            variant: "destructive",
            title: 'Update Failed',
            description: 'An error occurred while saving the content.',
        });
    }
  }
  
  const { isSubmitting, isDirty, isLoading } = form.formState;

  if (isLoading && !isDirty) {
      return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
            </div>
          
          <Tabs defaultValue="homepage" className="w-full">
            <TabsList>
              <TabsTrigger value="homepage">Homepage</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="homepage">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>
                        Manage the main banner on your homepage.
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
                <Card>
                    <CardHeader>
                        <CardTitle>Sale Banner</CardTitle>
                        <CardDescription>Manage the promotional sale banner on the homepage.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="saleBannerIsActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Show Sale Banner</FormLabel>
                                    <FormDescription>Toggle the visibility of the sale banner on the homepage.</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saleBannerImageUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Banner Image URL</FormLabel>
                                <FormControl><Input placeholder="https://example.com/sale-banner.jpg" {...field} /></FormControl>
                                <FormDescription>Optional: Add a background image to the banner.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saleBannerTitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Banner Title</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saleBannerSubtitle"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Banner Subtitle</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="saleBannerLink"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Banner Button Link</FormLabel>
                                <FormControl><Input placeholder="/sale" {...field} /></FormControl>
                                <FormDescription>The destination for the "View Deals" button.</FormDescription>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
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
            <TabsContent value="faq">
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Manage the questions and answers displayed on your site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                        {faqFields.map((field, index) => (
                            <AccordionItem value={`item-${index}`} key={field.id}>
                                <div className="flex items-center gap-2">
                                    <AccordionTrigger className="flex-1">
                                        <span className="truncate">
                                            {form.watch(`faqs.${index}.question`) || `Question ${index + 1}`}
                                        </span>
                                    </AccordionTrigger>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFaq(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                                <AccordionContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`faqs.${index}.question`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Question</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`faqs.${index}.answer`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Answer</FormLabel>
                                                <FormControl>
                                                    <Textarea className="min-h-[100px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => appendFaq({ question: '', answer: '' })}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add FAQ
                    </Button>
                </CardContent>
            </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
  );
}
