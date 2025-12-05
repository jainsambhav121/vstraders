
import type { Product, BlogPost, Review, FAQ, TeamMember, Customer, Order } from '../types';

export const categories = ["Pillows", "Cushions", "Mattresses", "Covers", "Sofa"];
export const brands = ["VSTRADERS", "ComfortPlus", "SleepWell", "LuxeHome"];
export const availableColors = ["White", "Grey", "Blue", "Beige", "Red", "Green"];
export const availableSizes = ["Standard", "King", "Queen", "16x16", "24x24", "Single", "Double"];

export const synonyms: Record<string, string[]> = {
    "couch": ["sofa", "seat"],
    "sofa": ["couch", "seat"],
    "bed": ["mattress", "sleeping"],
    "mattress": ["bed"],
    "pillow": ["cushion", "headrest"],
    "cushion": ["pillow", "throw"],
};

export const trendingSearches = ["Orthopedic Mattress", "Cotton Pillow", "Sofa Bed", "King Size"];

export const products: Product[] = [
    { 
        id: 1, 
        title: 'Quilted Pillow', 
        price: 9600, 
        category: 'Pillows', 
        description: 'Experience the ultimate comfort with our quilted pillow.', 
        keyFeatures: ['100% Cotton Cover', 'Hypoallergenic', 'Machine Washable'], 
        images: [
            'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1629949009765-4136a4185d75?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522771753035-1a5b6562f329?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 50,
        brand: "VSTRADERS",
        rating: 4.8,
        reviewsCount: 124,
        colors: ["White", "Beige"],
        sizes: ["Standard", "King"],
        sku: "PL-001-Q",
        tags: ["sleep", "soft", "bedroom"]
    },
    { 
        id: 2, 
        title: 'Micro Fiber Cushion', 
        price: 3600, 
        category: 'Cushions', 
        description: 'Ergonomic cushion for superior back support.', 
        keyFeatures: ['Pressure Relief', 'Breathable Mesh Cover', 'Non-slip Bottom'], 
        images: [
            'https://images.unsplash.com/photo-1579656381226-5fc70364d6d5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512918760532-3ea44e008dc3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1617325247661-675ab4b64ae8?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 120,
        brand: "ComfortPlus",
        rating: 4.5,
        reviewsCount: 89,
        colors: ["Grey", "Blue", "Red"],
        sizes: ["16x16", "24x24"],
        sku: "CU-002-MF",
        tags: ["decor", "living room", "support"]
    },
    { 
        id: 3, 
        title: 'Double Bed Ortho Mattress', 
        price: 71920, 
        category: 'Mattresses', 
        description: 'The perfect blend of spring support and foam comfort.', 
        keyFeatures: ['10-inch Thickness', 'Cooling Gel Infusion', '10-year Warranty'], 
        images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1505693416388-b03463149f13?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 20,
        brand: "SleepWell",
        rating: 4.9,
        reviewsCount: 210,
        colors: ["White", "Grey"],
        sizes: ["King", "Queen", "Double"],
        sku: "MT-003-OR",
        tags: ["orthopedic", "back pain", "luxury"]
    },
    { 
        id: 4, 
        title: 'Cotton Chain Cover', 
        price: 6400, 
        category: 'Covers', 
        description: 'Premium cotton chain cover for a luxurious and comfortable feel.', 
        keyFeatures: ['100% Cotton', 'Durable Fabric', 'Includes 2 Pillowcases'], 
        images: [
            'https://images.unsplash.com/photo-1522771753035-1a5b6562f329?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616627561839-074385245cf6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1618377388402-f90575ae95fd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 75,
        brand: "LuxeHome",
        rating: 4.3,
        reviewsCount: 45,
        colors: ["Beige", "White", "Green"],
        sizes: ["Standard"],
        sku: "CV-004-CC",
        tags: ["protection", "bedding"]
    },
    { 
        id: 5, 
        title: 'Sofa Cum Bed', 
        price: 96000, 
        category: 'Sofa', 
        description: 'A sleek and modern sofa to elevate your living room.', 
        keyFeatures: ['Solid Wood Frame', 'High-density Foam', 'Easy Assembly'], 
        images: [
            'https://drive.google.com/thumbnail?id=1tVxwgd80WoYR-x-WUwz7c-FWOW4GnqqO&sz=w1000',
            'https://drive.google.com/thumbnail?id=1xhZZnAAHBENnmvM2Ca15seI7MLbzD19m&sz=w1000',
            'https://drive.google.com/thumbnail?id=1cqjrNJu9b6wWKes1Zuo_Af_WWVyLpMuz&sz=w1000',
            'https://drive.google.com/thumbnail?id=1y2hxLTJoORNKUwGL_I9oF4FXF0juM43d&sz=w1000'
        ], 
        stock: 10,
        brand: "VSTRADERS",
        rating: 4.7,
        reviewsCount: 15,
        colors: ["Grey", "Blue"],
        sizes: ["Double"],
        sku: "SF-005-CB",
        tags: ["furniture", "convertible", "space saving"]
    },
    { 
        id: 6, 
        title: 'Micro Fiber Pillow', 
        price: 7600, 
        category: 'Pillows', 
        description: 'Experience superior comfort with our premium Micro Fiber Pillow.', 
        keyFeatures: ['Soft & Supportive', 'Hypoallergenic', 'Removable Cover'], 
        images: [
            'https://images.unsplash.com/photo-1629949009765-4136a4185d75?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1617325247661-675ab4b64ae8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616627561839-074385245cf6?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 60,
        brand: "ComfortPlus",
        rating: 4.4,
        reviewsCount: 230,
        colors: ["White"],
        sizes: ["Standard"],
        sku: "PL-006-MF",
        tags: ["basic", "soft"]
    },
    { 
        id: 7, 
        title: '24×24 Micro fiber Cushion Pillow', 
        price: 2800, 
        category: 'Cushions', 
        description: 'Add a touch of elegance with this plush microfiber cushion.', 
        keyFeatures: ['Hidden Zipper', 'High Quality Microfiber', 'Insert Included'], 
        images: [
            'https://images.unsplash.com/photo-1579656381226-5fc70364d6d5?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522771753035-1a5b6562f329?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512918760532-3ea44e008dc3?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 200,
        brand: "LuxeHome",
        rating: 4.6,
        reviewsCount: 67,
        colors: ["White", "Red", "Grey"],
        sizes: ["24x24"],
        sku: "CU-007-24",
        tags: ["large", "decorative"]
    },
    { 
        id: 8, 
        title: 'Three Fold EPE Mattress', 
        price: 60000, 
        category: 'Mattresses', 
        description: 'Premium Three Fold EPE Mattress for versatile comfort and space-saving design.', 
        keyFeatures: ['Foldable Design', 'High Density EPE Foam', 'Portable & Lightweight'], 
        images: [
             'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1505693416388-b03463149f13?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'
        ], 
        stock: 30,
        brand: "SleepWell",
        rating: 4.2,
        reviewsCount: 34,
        colors: ["Blue", "Red"],
        sizes: ["Single"],
        sku: "MT-008-TF",
        tags: ["travel", "guest", "portable"]
    },
];

export const blogPosts: BlogPost[] = [
    { id: 1, title: 'The Ultimate Guide to Choosing the Perfect Pillow', author: 'Jane Doe', date: '2024-07-28', image: 'https://picsum.photos/id/101/800/400', excerpt: 'Finding the right pillow is key to a good night\'s sleep. Here\'s how to choose...', content: 'Full blog content goes here...' },
    { id: 2, title: '5 Ways a Good Mattress Can Improve Your Health', author: 'John Smith', date: '2024-07-25', image: 'https://picsum.photos/id/102/800/400', excerpt: 'Your mattress affects more than just your sleep. Discover the health benefits...', content: 'Full blog content goes here...' },
    { id: 3, title: 'Decorating with Cushions: A Beginner\'s Guide', author: 'Emily White', date: '2024-07-22', image: 'https://picsum.photos/id/103/800/400', excerpt: 'Learn how to use cushions to add color, texture, and style to any room.', content: 'Full blog content goes here...' },
];

export const reviews: Review[] = [
    { id: 1, name: 'Alice Johnson', rating: 5, comment: 'The best pillow I have ever owned! My neck pain is gone.', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bob Williams', rating: 4, comment: 'Great mattress, very comfortable. Delivery was a bit slow though.', image: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Charlie Brown', rating: 5, comment: 'These cushions are gorgeous and so soft. Highly recommend!', image: 'https://i.pravatar.cc/150?img=3' },
];

export const faqs: FAQ[] = [
    { question: 'What is your return policy?', answer: 'We offer a 30-night risk-free trial. If you are not satisfied, you can return the product for a full refund.' },
    { question: 'How do I track my order?', answer: 'Once your order has shipped, you will receive an email with a tracking number and a link to the carrier\'s website.' },
    { question: 'Do you offer financing?', answer: 'Yes, we partner with several financing companies to offer flexible payment options at checkout.' },
];

export const teamMembers: TeamMember[] = [
    { name: 'John Doe', role: 'Founder & CEO', testimonial: 'Our mission is to bring comfort to every home with high-quality, affordable products.', image: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Jane Smith', role: 'Head of Design', testimonial: 'Every design is crafted with passion, focusing on both aesthetics and functionality.', image: 'https://i.pravatar.cc/150?img=6' },
    { name: 'Peter Jones', role: 'Customer Happiness Lead', testimonial: 'We are here to ensure your experience with VSTRADERS is nothing short of exceptional.', image: 'https://i.pravatar.cc/150?img=7' }
];

export const customers: Customer[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', totalOrders: 3, totalSpent: 102400 },
    { id: 2, name: 'Bob Williams', email: 'bob@example.com', phone: '234-567-8901', totalOrders: 1, totalSpent: 60000 },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', totalOrders: 5, totalSpent: 28000 },
];

export const orders: Order[] = [
    { id: 'ORD-001', customerId: 1, customerName: 'Alice Johnson', date: '2024-07-30', status: 'Delivered', paymentStatus: 'Paid', total: 9600 },
    { id: 'ORD-002', customerId: 2, customerName: 'Bob Williams', date: '2024-07-29', status: 'Shipped', paymentStatus: 'Paid', total: 60000 },
    { id: 'ORD-003', customerId: 3, customerName: 'Charlie Brown', date: '2024-07-29', status: 'Pending', paymentStatus: 'Unpaid', total: 2800 },
    { id: 'ORD-004', customerId: 1, customerName: 'Alice Johnson', date: '2024-07-28', status: 'Cancelled', paymentStatus: 'Unpaid', total: 71920 },
];
