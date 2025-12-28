

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
import Link from 'next/link';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import React, { useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const blogPostSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters.' }),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  imageAlt: z.string().min(2, { message: 'Image alt text is required.' }),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoMetaDescription: z.string().optional(),
});


export default function EditBlogPostPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      imageAlt: '',
      featured: false,
      seoTitle: '',
      seoMetaDescription: '',
    },
  });

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (!firestore || !id) return;
    const fetchPost = async () => {
        const postRef = doc(firestore, 'blogPosts', id as string);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
            const postData = postSnap.data();
            form.reset({
                title: postData.title,
                excerpt: postData.excerpt,
                content: postData.content,
                imageUrl: postData.imageUrl,
                imageAlt: postData.imageAlt,
                featured: postData.featured,
                seoTitle: postData.seoTitle,
                seoMetaDescription: postData.seoMetaDescription,
            });
        } else {
            notFound();
        }
        setLoading(false);
    }
    fetchPost();
  }, [id, firestore, form]);


  async function onSubmit(values: z.infer<typeof blogPostSchema>) {
    if (!firestore || !id) {
      toast({ variant: 'destructive', title: 'Error', description: 'Post ID or database error.' });
      return;
    }

    try {
      const postRef = doc(firestore, 'blogPosts', id as string);
      await updateDoc(postRef, {
          ...values,
          updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Blog Post Updated',
        description: `The post "${values.title}" has been successfully updated.`,
      });
      router.push('/dashboard/blog');
    } catch (error: any) {
      console.error('Error updating document: ', error);
      toast({
        variant: 'destructive',
        title: 'Error updating post',
        description: error.message || 'There was an issue saving the post.',
      });
    }
  }

  const { isSubmitting } = form.formState;

  if (loading) {
    return (
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-6 w-48" />
        </div>
         <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card><CardHeader><Skeleton className="h-5 w-40" /></CardHeader><CardContent><div className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-20 w-full" /></div></CardContent></Card>
            </div>
             <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card><CardHeader><Skeleton className="h-5 w-32" /></CardHeader><CardContent><Skeleton className="h-16 w-full" /></CardContent></Card>
             </div>
        </div>
      </div>
    );
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/dashboard/blog">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Edit Blog Post
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
             <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/blog')}>
              Discard Changes
            </Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Update the details of your blog post.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="excerpt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                     <FormDescription>This will be shown in the blog post list.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="content" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl><Textarea className="min-h-[300px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize for search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="seoTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                     <FormDescription>If empty, the post title will be used.</FormDescription>
                  </FormItem>
                )} />
                <FormField control={form.control} name="seoMetaDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Meta Description</FormLabel>
                    <FormControl><Textarea {...field} /></FormControl>
                    <FormDescription>If empty, the post excerpt will be used.</FormDescription>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Media & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="imageAlt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image Alt Text</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="featured" render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5"><FormLabel>Featured Post</FormLabel></div>
                      <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    </FormItem>
                  )} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
           <Button variant="outline" size="sm" type="button" onClick={() => router.push('/dashboard/blog')}>Discard</Button>
          <Button size="sm" type="submit" disabled={isSubmitting}>
             {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
