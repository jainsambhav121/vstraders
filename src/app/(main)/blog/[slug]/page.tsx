
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { useBlogPosts } from '@/hooks/use-blog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BlogPostCard from '@/components/blog-post-card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;
  const { posts, loading } = useBlogPosts();

  const post = posts.find((p) => p.slug === slug);
  const relatedPosts = posts.filter(p => p.id !== post?.id).slice(0, 3);

  if (loading) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <Skeleton className="mb-8 h-6 w-1/2" />
            <Skeleton className="relative mb-8 h-96 w-full" />
            <Skeleton className="mb-4 h-10 w-3/4" />
            <Skeleton className="mb-8 h-6 w-1/3" />
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    )
  }

  if (!post) {
    notFound();
  }
  
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <article>
        <header className="mb-8">
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg md:h-96">
             <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
              />
          </div>
          <h1 className="font-headline text-3xl font-bold md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div 
            className="prose prose-lg max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />
      </article>

      <Separator className="my-12" />

      <section>
          <h2 className="mb-8 text-center font-headline text-3xl font-bold">Related Posts</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
                <BlogPostCard key={p.id} post={p} />
            ))}
          </div>
      </section>
    </div>
  );
}
