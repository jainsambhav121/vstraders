
import { PlaceHolderImages } from './placeholder-images';
import type { Category, Review, BlogPost } from './types';
import { Pill, BedDouble, Sofa, Feather } from 'lucide-react';

export const categories: Category[] = [
  { id: 'cat-1', name: 'Pillows', slug: 'pillows', icon: Pill, description: 'Foam, Fiber & Quilted Pillows' },
  { id: 'cat-2', name: 'Mattress', slug: 'mattresses', icon: BedDouble, description: 'Polyurethane, Queen & Folding Mattresses' },
  { id: 'cat-3', name: 'Covers', slug: 'covers', icon: Sofa, description: 'Mattress & Cushion Covers' },
  { id: 'cat-4', name: 'Cushions', slug: 'cushions', icon: Feather, description: 'Microfiber & Comfort Cushions' },
];

export const reviews: Review[] = [
    { id: 'REV-001', customerName: 'Alice Johnson', rating: 5, title: 'Absolutely love it!', comment: 'The smart watch is amazing. The battery life is great and it looks very stylish.', date: '2023-09-01' },
    { id: 'REV-002', customerName: 'Bob Williams', rating: 4, title: 'Very good headphones', comment: 'The noise cancellation is effective, but the fit could be a bit more comfortable for long sessions.', date: '2023-08-28' },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-post-1',
    title: 'The Ultimate Guide to Choosing the Perfect Pillow',
    slug: 'perfect-pillow-guide',
    author: 'Jane Doe',
    date: 'Oct 26, 2023',
    excerpt: 'Finding the right pillow is crucial for a good night\'s sleep. In this guide, we cover everything from materials to firmness to help you make the best choice.',
    imageUrl: 'https://picsum.photos/seed/blog-1/800/450',
    imageAlt: 'A person sleeping comfortably on a pillow.',
    featured: true,
  },
  {
    id: 'blog-post-2',
    title: 'How to Style Your Living Room with Cushions',
    slug: 'styling-with-cushions',
    author: 'John Smith',
    date: 'Oct 22, 2023',
    excerpt: 'Cushions are a powerful design tool. Learn how to use different textures, colors, and sizes to transform your living space.',
    imageUrl: 'https://picsum.photos/seed/blog-2/800/450',
    imageAlt: 'A stylish living room with decorative cushions on a sofa.',
    featured: true,
  },
  {
    id: 'blog-post-3',
    title: 'Mattress 101: A Comprehensive Guide',
    slug: 'mattress-101',
    author: 'Emily White',
    date: 'Oct 18, 2023',
    excerpt: 'From memory foam to innerspring, buying a mattress can be confusing. Our guide breaks down the types and features to consider.',
    imageUrl: 'https://picsum.photos/seed/blog-3/800/450',
    imageAlt: 'Cross-section of a mattress showing different layers.',
    featured: false,
  },
  {
    id: 'blog-post-4',
    title: '5 Reasons to Use a Mattress Protector',
    slug: 'why-use-mattress-protector',
    author: 'Michael Brown',
    date: 'Oct 15, 2023',
    excerpt: 'A mattress protector is a small investment that can save you a lot of trouble. Here are five key benefits to protecting your mattress.',
    imageUrl: 'https://picsum.photos/seed/blog-4/800/450',
    imageAlt: 'A person fitting a mattress protector on a bed.',
    featured: false,
  },
];
