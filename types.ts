
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    keyFeatures: string[];
    images: string[];
    stock: number;
    // New fields for advanced search
    brand: string;
    rating: number;
    reviewsCount: number;
    colors: string[];
    sizes: string[];
    sku: string;
    tags: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    image: string;
}

export interface BlogPost {
    id: number;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface TeamMember {
    name: string;
    role: string;
    testimonial: string;
    image: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
}

export interface Order {
    id: string;
    customerId: number;
    customerName: string;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentStatus: 'Paid' | 'Unpaid';
    total: number;
}

export interface FilterState {
    minPrice: number;
    maxPrice: number;
    brands: string[];
    colors: string[];
    sizes: string[];
    minRating: number;
    categories: string[];
}
