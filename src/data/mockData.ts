import { Product, BlogPost } from "../types";

export const categories = [
  { id: 'mattresses', name: 'Mattresses', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000' },
  { id: 'pillows', name: 'Pillows', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=1000' },
  { id: 'bedsheets', name: 'Bedsheets', image: 'https://images.unsplash.com/photo-1522771753035-0a153950c6b2?auto=format&fit=crop&q=80&w=1000' },
  { id: 'protectors', name: 'Protectors', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1000' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Cloud Comfort Memory Foam Mattress',
    description: 'Experience the ultimate sleep with our premium memory foam mattress. Designed for optimal support and cooling comfort.',
    price: 29999,
    category: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    sizes: ['Twin', 'Queen', 'King']
  },
  {
    id: '2',
    name: 'Ergonomic Cervical Pillow',
    description: 'Say goodbye to neck pain with our scientifically designed ergonomic pillow.',
    price: 1999,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 89,
    inStock: true,
    isSale: true,
    discountPrice: 1499
  },
  {
    id: '3',
    name: 'Egyptian Cotton Sheet Set',
    description: 'Luxurious 1000 thread count Egyptian cotton sheets for a hotel-like experience at home.',
    price: 4999,
    category: 'Bedsheets',
    image: 'https://images.unsplash.com/photo-1522771753035-0a153950c6b2?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 210,
    inStock: true,
    colors: ['White', 'Grey', 'Beige']
  },
  {
    id: '4',
    name: 'Waterproof Mattress Protector',
    description: 'Protect your investment with our breathable, waterproof mattress protector.',
    price: 1299,
    category: 'Protectors',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 56,
    inStock: true,
    sizes: ['Queen', 'King']
  },
  {
    id: '5',
    name: 'Hybrid Spring Mattress',
    description: 'The perfect balance of coils and foam for responsive support.',
    price: 34999,
    category: 'Mattresses',
    image: 'https://images.unsplash.com/photo-1505693416388-b0346d6771b4?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 45,
    inStock: true
  },
  {
    id: '6',
    name: 'Cooling Gel Memory Pillow',
    description: 'Stay cool all night with our advanced cooling gel technology.',
    price: 2499,
    category: 'Pillows',
    image: 'https://images.unsplash.com/photo-1629949009765-40f7f424ad78?auto=format&fit=crop&q=80&w=800',
    rating: 4.3,
    reviews: 32,
    inStock: true
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Science of Sleep: Why Your Mattress Matters',
    excerpt: 'Discover how the right mattress can improve your sleep quality, health, and overall well-being.',
    content: 'Full content would go here...',
    author: 'Dr. Sarah Smith',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1505693416388-b0346d6771b4?auto=format&fit=crop&q=80&w=800',
    category: 'Sleep Health'
  },
  {
    id: '2',
    title: '5 Tips for Maintaining Your Bedding',
    excerpt: 'Learn how to care for your sheets, pillows, and comforters to make them last longer.',
    content: 'Full content would go here...',
    author: 'John Doe',
    date: '2024-03-10',
    image: 'https://images.unsplash.com/photo-1522771753035-0a153950c6b2?auto=format&fit=crop&q=80&w=800',
    category: 'Care Guide'
  },
  {
    id: '3',
    title: 'Creating the Perfect Bedroom Sanctuary',
    excerpt: 'Interior design tips to transform your bedroom into a peaceful retreat.',
    content: 'Full content would go here...',
    author: 'Emily White',
    date: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    category: 'Design'
  }
];
