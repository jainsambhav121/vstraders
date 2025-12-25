
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BlogPostCard from '@/components/blog-post-card';
import { Separator } from '@/components/ui/separator';

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }
  
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

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
          <div className="relative mb-8 h-64 w-full md:h-96 overflow-hidden rounded-lg">
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

        <div className="prose max-w-none text-muted-foreground prose-lg">
          <p className="lead">{post.excerpt}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 
          </p>
           <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
          </p>
        </div>
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
