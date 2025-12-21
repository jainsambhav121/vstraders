import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.slug}`} className="block aspect-video">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            width={800}
            height={450}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="blog post image"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6">
        <CardTitle className="mb-2 text-xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <p className="mb-4 text-sm text-muted-foreground">
          By {post.author} on {post.date}
        </p>
        <p className="flex-1 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-4">
          <Link href={`/blog/${post.slug}`} className="group inline-flex items-center font-semibold text-primary">
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
