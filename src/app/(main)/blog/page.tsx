
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useBlogPosts } from '@/hooks/use-blog';
import BlogPostCard from '@/components/blog-post-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const { posts, loading } = useBlogPosts();
  
  const featuredPosts = posts.filter((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">Insights and stories from our team</p>
      </header>

      {loading ? (
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      ) : featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">Featured Posts</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group relative block overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="featured blog post"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white md:p-8">
                  <h3 className="font-headline text-2xl font-bold md:text-3xl">{post.title}</h3>
                  <p className="mt-2 text-sm text-primary-foreground/80">{post.excerpt}</p>
                   <div className="mt-4 inline-flex items-center font-semibold text-primary-foreground group-hover:text-primary">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 text-center font-headline text-3xl font-bold">All Posts</h2>
        {loading ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({length: 3}).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-video w-full rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
            </div>
        )}
      </section>
    </div>
  );
}
