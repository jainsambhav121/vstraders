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
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: {
    type: 'percentage' | 'flat';
    value: number;
  };
  finalPrice: number;
  category: Category;
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
  
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

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
