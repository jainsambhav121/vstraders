export type Image = {
  id: string;
  url: string;
  alt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: Image[];
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
};

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Canceled';

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  orderCount: number;
  registeredDate: string;
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
