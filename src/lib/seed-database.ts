
import { initializeFirebase } from '../firebase/index';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { PlaceHolderImages } from './placeholder-images';
import type { Product, HeroSlide } from './types';
import { categories } from './data';

const { firestore, auth } = initializeFirebase();

const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Luxury Microfiber Pillow',
    productName: 'Luxury Microfiber Pillow',
    description: 'Experience the ultimate comfort with our luxury microfiber pillow. Designed for optimal neck support and durability.',
    brand: 'VSTRADERS',
    basePrice: 999,
    discount: { type: 'percentage', value: 20 },
    finalPrice: 799,
    category: 'pillows',
    stock: 50,
    images: [
      { url: PlaceHolderImages.find(img => img.id === 'prod-1')?.imageUrl || '', isPrimary: true },
      { url: PlaceHolderImages.find(img => img.id === 'prod-1b')?.imageUrl || '', isPrimary: false },
      { url: PlaceHolderImages.find(img => img.id === 'prod-1c')?.imageUrl || '', isPrimary: false },
    ],
    primaryImage: PlaceHolderImages.find(img => img.id === 'prod-1')?.imageUrl || '',
    specifications: [
      { label: 'Material', value: 'Microfiber' },
      { label: 'Size', value: 'Standard' },
    ],
    variants: [],
    status: {
      isEnabled: true,
      isFeatured: true,
      isBestSeller: true,
      isNew: false,
    },
    seo: {
      slug: 'luxury-microfiber-pillow',
      title: 'Luxury Microfiber Pillow - VSTRADERS',
      metaDescription: 'Buy Luxury Microfiber Pillow online at VSTRADERS.',
      keywords: ['pillow', 'microfiber', 'sleep'],
    },
    rating: 4.5,
    reviewCount: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Quilted Comfort Pillow',
    productName: 'Quilted Comfort Pillow',
    description: 'Soft and breathable quilted pillow for a restful sleep.',
    brand: 'VSTRADERS',
    basePrice: 699,
    finalPrice: 699,
    category: 'pillows',
    stock: 100,
    images: [
       { url: PlaceHolderImages.find(img => img.id === 'prod-2')?.imageUrl || '', isPrimary: true },
    ],
    primaryImage: PlaceHolderImages.find(img => img.id === 'prod-2')?.imageUrl || '',
    specifications: [
      { label: 'Material', value: 'Cotton Blend' },
    ],
    variants: [],
    status: {
      isEnabled: true,
      isFeatured: false,
      isBestSeller: true,
      isNew: true,
    },
    seo: {
        slug: 'quilted-comfort-pillow',
        title: 'Quilted Comfort Pillow',
        metaDescription: 'Soft quilted pillow.',
        keywords: ['quilted', 'pillow'],
    },
    rating: 4.2,
    reviewCount: 45,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-8',
    name: 'Royal King Size Mattress',
    productName: 'Royal King Size Mattress',
    description: 'High-density polyurethane mattress for superior back support.',
    brand: 'VSTRADERS',
    basePrice: 15999,
    discount: { type: 'flat', value: 2000 },
    finalPrice: 13999,
    category: 'mattresses',
    stock: 10,
    images: [
       { url: PlaceHolderImages.find(img => img.id === 'prod-8')?.imageUrl || '', isPrimary: true },
       { url: PlaceHolderImages.find(img => img.id === 'prod-8b')?.imageUrl || '', isPrimary: false },
    ],
    primaryImage: PlaceHolderImages.find(img => img.id === 'prod-8')?.imageUrl || '',
    specifications: [
      { label: 'Type', value: 'Polyurethane' },
      { label: 'Size', value: 'King' },
    ],
    variants: [],
    status: {
      isEnabled: true,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
    },
    seo: {
        slug: 'royal-king-size-mattress',
        title: 'Royal King Size Mattress',
        metaDescription: 'King size mattress.',
        keywords: ['mattress', 'king size'],
    },
    rating: 4.8,
    reviewCount: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-9',
    name: 'Tri-Fold Guest Mattress',
    productName: 'Tri-Fold Guest Mattress',
    description: 'Convenient folding mattress, perfect for guests and travel.',
    brand: 'VSTRADERS',
    basePrice: 4500,
    finalPrice: 4500,
    category: 'mattresses',
    stock: 25,
    images: [
        { url: PlaceHolderImages.find(img => img.id === 'prod-9')?.imageUrl || '', isPrimary: true },
    ],
    primaryImage: PlaceHolderImages.find(img => img.id === 'prod-9')?.imageUrl || '',
    specifications: [
        { label: 'Type', value: 'EPE Foam' },
        { label: 'Feature', value: 'Foldable' },
    ],
    variants: [],
    status: {
      isEnabled: true,
      isFeatured: true,
      isBestSeller: true,
      isNew: false,
    },
     seo: {
        slug: 'tri-fold-guest-mattress',
        title: 'Tri-Fold Guest Mattress',
        metaDescription: 'Foldable mattress.',
        keywords: ['mattress', 'folding'],
    },
    rating: 4.0,
    reviewCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-11',
    name: 'Waterproof Mattress Protector',
    productName: 'Waterproof Mattress Protector',
    description: 'Protect your mattress from spills and stains with our premium cover.',
    brand: 'VSTRADERS',
    basePrice: 1299,
    finalPrice: 1299,
    category: 'covers',
    stock: 200,
    images: [
        { url: PlaceHolderImages.find(img => img.id === 'prod-11')?.imageUrl || '', isPrimary: true },
    ],
    primaryImage: PlaceHolderImages.find(img => img.id === 'prod-11')?.imageUrl || '',
    specifications: [
        { label: 'Material', value: 'Terry Cotton' },
        { label: 'Waterproof', value: 'Yes' },
    ],
    variants: [],
    status: {
      isEnabled: true,
      isFeatured: false,
      isBestSeller: true,
      isNew: true,
    },
     seo: {
        slug: 'waterproof-mattress-protector',
        title: 'Waterproof Mattress Protector',
        metaDescription: 'Mattress protector.',
        keywords: ['mattress cover', 'protector'],
    },
    rating: 4.6,
    reviewCount: 88,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const homepageContent = {
  heroSlides: [
    {
      title: 'Experience Premium Comfort',
      tagline: 'Upgrade your sleep with our luxury mattresses and pillows.',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-b0346efee53e?q=80&w=1920&auto=format&fit=crop',
      buttonLink: '/category/mattresses',
    },
    {
      title: 'New Arrivals',
      tagline: 'Check out our latest collection of home essentials.',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1920&auto=format&fit=crop',
      buttonLink: '/products',
    }
  ] as HeroSlide[],
  saleBannerIsActive: true,
  saleBannerTitle: 'Monsoon Sale',
  saleBannerSubtitle: 'Up to 30% off on all waterproof covers.',
  saleBannerLink: '/category/covers',
  saleBannerImageUrl: 'https://images.unsplash.com/photo-1556036137-2363d64c6716?q=80&w=1920&auto=format&fit=crop',
};

async function seed() {
  console.log('Starting seed process...');

  try {
    const email = `seed-admin-${Date.now()}@example.com`;
    const password = 'TemporaryPassword123!';

    // 1. Authenticate with Email/Password
    console.log(`Authenticating with ${email}...`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(`Authenticated as ${user.uid}`);

    // 2. Escalate privileges (Self-promote to admin)
    // This relies on the security rule: match /users/{userId} { allow write: if isOwner(userId) || isAdmin(); }
    console.log('Escalating privileges...');
    await setDoc(doc(firestore, 'users', user.uid), {
      role: 'admin',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    console.log('Privileges escalated to admin.');

    // 3. Seed Products
    console.log('Seeding products...');
    for (const product of products) {
      await setDoc(doc(firestore, 'products', product.id), product);
      console.log(`Seeded product: ${product.name}`);
    }

    // 4. Seed Homepage Content
    console.log('Seeding homepage content...');
    await setDoc(doc(firestore, 'homepageContent', 'main'), homepageContent);
    console.log('Seeded homepage content.');

    console.log('Seed process completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
