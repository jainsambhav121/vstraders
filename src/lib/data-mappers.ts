
import type { DocumentData, Timestamp } from 'firebase/firestore';
import type { Product, Order, User, BlogPost } from './types';

// Centralized function to safely get a date from a Timestamp or fall back.
function getDateFromTimestamp(timestamp: any, fallback: Date = new Date()): Date {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    }
    // Attempt to parse if it's a string or number, though Timestamp is expected.
    if (typeof timestamp === 'string' || typeof timestamp === 'number') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    return fallback;
}


// Mapper for Product data
export function mapDocToProduct(doc: DocumentData): Product {
    const data = doc.data();
    
    let finalPrice = data.basePrice || 0;
    if (data.discount && data.discount.value > 0 && data.basePrice) {
        if (data.discount.type === 'percentage') {
            finalPrice = data.basePrice * (1 - data.discount.value / 100);
        } else if (data.discount.type === 'flat') {
            finalPrice = data.basePrice - data.discount.value;
        }
    }

    return {
        id: doc.id,
        name: data.name || 'Unnamed Product',
        description: data.description || '',
        brand: data.brand || '',
        basePrice: data.basePrice || 0,
        finalPrice: finalPrice,
        discount: data.discount,
        category: data.category || 'uncategorized',
        stock: data.stock || 0,
        images: data.images || [],
        primaryImage: data.primaryImage || (data.images && data.images.length > 0 ? data.images[0] : ''),
        videoUrl: data.videoUrl,
        variants: data.variants || [],
        details: data.details || [],
        status: data.status || { isEnabled: true, isFeatured: false, isBestSeller: false, isNew: false },
        seo: data.seo || { slug: doc.id },
        rating: data.rating || 0,
        reviewCount: data.reviewCount || 0,
        productName: data.name || '',
        specifications: data.details || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}

// Mapper for Order data
export function mapDocToOrder(doc: DocumentData): Order {
    const data = doc.data();
    const orderDate = getDateFromTimestamp(data.createdAt);

    return {
        id: doc.id,
        customerName: data.customerDetails?.name || 'N/A',
        customerEmail: data.customerDetails?.email || 'N/A',
        date: orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        total: data.totalAmount || 0,
        status: data.orderStatus || 'Pending',
        items: data.products?.length || 0,
        paymentStatus: data.paymentStatus || 'Pending',
    };
}

// Mapper for User data
export function mapDocToUser(doc: DocumentData): User {
    const data = doc.data();
    const creationDate = getDateFromTimestamp(data.createdAt);

    return {
        id: doc.id,
        name: data.name || 'Unnamed User',
        email: data.email || '',
        avatar: `https://i.pravatar.cc/150?u=${doc.id}`,
        totalSpent: data.totalSpent || 0,
        orderCount: data.orderCount || 0,
        createdAt: creationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        isActive: data.isActive === undefined ? true : data.isActive,
        role: data.role || 'customer',
    };
}


// Mapper for BlogPost data
export function mapDocToBlogPost(doc: DocumentData): BlogPost {
    const data = doc.data();
    const publishedDate = getDateFromTimestamp(data.publishedAt);
    
    return {
        id: doc.id,
        title: data.title || 'Untitled Post',
        author: data.author || 'Anonymous',
        date: publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        excerpt: data.excerpt || '',
        content: data.content || '',
        imageUrl: data.imageUrl || '',
        imageAlt: data.imageAlt || data.title || 'Blog post image',
        featured: data.featured || false,
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt,
        seoTitle: data.seoTitle,
        seoMetaDescription: data.seoMetaDescription,
    };
}
