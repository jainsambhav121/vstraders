

import type { User as FirebaseUser } from 'firebase/auth';
import type { LucideIcon } from 'lucide-react';

export type Image = {
  url: string;
  alt?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
};

export type ProductVariant = {
  id: string;
  size?: string;
  thickness?: string;
  material?: string;
  color?: string;
  price?: number;
  stock: number;
};

export type Product = {
  id:string;
  name: string;
  description: string;
  price: number;
  discount?: {
    type: 'percentage' | 'flat';
    value: number;
  };
  finalPrice: number;
  category: string;
  images: Image[];
  primaryImageIndex: number;
  stock: number;
  variants: ProductVariant[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isEnabled: boolean;
  seoTitle: string;
  seoMetaDescription: string;
  seoKeywords: string[];
  slug: string;
  sku?: string;
  rating: number;
  reviewCount: number;
  createdAt?: any;
  updatedAt?: any;
};

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';
  
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
  paymentStatus: PaymentStatus;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orderCount: number;
  createdAt: string;
  isActive: boolean;
  role: 'admin' | 'manager' | 'customer';
};

export type Review = {
  id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
};

export type FaqItem = {
    question: string;
    answer: string;
};

export type AuthenticatedUser = FirebaseUser;
