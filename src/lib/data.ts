import { PlaceHolderImages } from './placeholder-images';
import type { Product, Category, Order, Customer, Review } from './types';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return {
    id,
    url: image?.imageUrl || 'https://picsum.photos/seed/placeholder/600/600',
    alt: image?.description || 'Placeholder image',
  };
};

export const categories: Category[] = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics' },
  { id: 'cat-2', name: 'Fashion', slug: 'fashion' },
  { id: 'cat-3', name: 'Home Goods', slug: 'home-goods' },
  { id: 'cat-4', name: 'Office', slug: 'office' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 7',
    description: 'The future of health is on your wrist. Measure your blood oxygen level with a revolutionary new sensor and app. Take an ECG anytime, anywhere.',
    price: 399.99,
    category: categories[0],
    images: [findImage('prod-1')],
    stock: 25,
    sku: 'SW-S7-BLK',
    rating: 4.8,
    reviewCount: 125,
  },
  {
    id: '2',
    name: 'Aura Wireless Headphones',
    description: 'High-fidelity audio, industry-leading noise cancellation, and a comfortable, over-ear design. The perfect headphones for music lovers and frequent flyers.',
    price: 249.99,
    category: categories[0],
    images: [findImage('prod-2')],
    stock: 40,
    sku: 'AWH-NC-WHT',
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: '3',
    name: 'ProShot DSLR Camera',
    description: 'Capture your moments in stunning detail with the ProShot DSLR. Featuring a 24.2MP sensor, 4K video recording, and a versatile lens kit.',
    price: 899.0,
    category: categories[0],
    images: [findImage('prod-3')],
    stock: 15,
    sku: 'PS-DSLR-K1',
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: '4',
    name: 'Urban Voyager Backpack',
    description: 'A stylish and durable backpack crafted from genuine leather. With multiple compartments and a padded laptop sleeve, it\'s perfect for work and travel.',
    price: 179.5,
    category: categories[1],
    images: [findImage('prod-4')],
    stock: 30,
    sku: 'UVB-LTHR-BRN',
    rating: 4.7,
    reviewCount: 76,
  },
    {
    id: '5',
    name: 'Classic Ceramic Mug',
    description: 'A simple and elegant 12oz ceramic mug. Perfect for your morning coffee or evening tea. Microwave and dishwasher safe.',
    price: 12.99,
    category: categories[2],
    images: [findImage('prod-5')],
    stock: 150,
    sku: 'CCM-WHT-12',
    rating: 4.9,
    reviewCount: 342,
  },
  {
    id: '6',
    name: 'ErgoComfort Office Chair',
    description: 'Experience all-day comfort with the ErgoComfort chair. Features adjustable lumbar support, armrests, and a breathable mesh back.',
    price: 349.00,
    category: categories[3],
    images: [findImage('prod-6')],
    stock: 22,
    sku: 'EOC-BLK-MESH',
    rating: 4.5,
    reviewCount: 188,
  },
    {
    id: '7',
    name: 'Chef\'s Master Knife Set',
    description: 'A 7-piece set of high-carbon stainless steel knives. Includes a chef\'s knife, bread knife, santoku knife, and more, all housed in a wooden block.',
    price: 299.99,
    category: categories[2],
    images: [findImage('prod-7')],
    stock: 18,
    sku: 'CMKS-7PC-WD',
    rating: 4.8,
    reviewCount: 154,
  },
  {
    id: '8',
    name: 'Legacy Fountain Pen',
    description: 'Write with elegance. The Legacy Fountain Pen features a 14k gold nib and a classic, weighted design for a superior writing experience.',
    price: 159.00,
    category: categories[3],
    images: [findImage('prod-8')],
    stock: 45,
    sku: 'LFP-GLD-BLK',
    rating: 4.7,
    reviewCount: 92,
  },
];

export const orders: Order[] = [
  { id: 'ORD-001', customerName: 'Alice Johnson', customerEmail: 'alice@example.com', date: '2023-10-26', total: 411.98, status: 'Delivered', items: 2 },
  { id: 'ORD-002', customerName: 'Bob Williams', customerEmail: 'bob@example.com', date: '2023-10-25', total: 249.99, status: 'Shipped', items: 1 },
  { id: 'ORD-003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', date: '2023-10-25', total: 899.00, status: 'Processing', items: 1 },
  { id: 'ORD-004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', date: '2023-10-24', total: 12.99, status: 'Pending', items: 1 },
  { id: 'ORD-005', customerName: 'Ethan Hunt', customerEmail: 'ethan@example.com', date: '2023-10-23', total: 349.00, status: 'Canceled', items: 1 },
  { id: 'ORD-006', customerName: 'Fiona Glenanne', customerEmail: 'fiona@example.com', date: '2023-10-22', total: 479.49, status: 'Delivered', items: 2 },
];

export const customers: Customer[] = [
  { id: 'CUST-001', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', totalSpent: 1250.75, orderCount: 5, registeredDate: '2023-01-15' },
  { id: 'CUST-002', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', totalSpent: 850.50, orderCount: 3, registeredDate: '2023-03-22' },
  { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', totalSpent: 2300.00, orderCount: 8, registeredDate: '2022-11-30' },
  { id: 'CUST-004', name: 'Diana Prince', email: 'diana@example.com', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d', totalSpent: 300.20, orderCount: 2, registeredDate: '2023-05-10' },
];

export const reviews: Review[] = [
    { id: 'REV-001', customerName: 'Alice Johnson', rating: 5, title: 'Absolutely love it!', comment: 'The smart watch is amazing. The battery life is great and it looks very stylish.', date: '2023-09-01' },
    { id: 'REV-002', customerName: 'Bob Williams', rating: 4, title: 'Very good headphones', comment: 'The noise cancellation is effective, but the fit could be a bit more comfortable for long sessions.', date: '2023-08-28' },
];
