
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../firebase/config';

const blogPosts = [
  {
    id: 'blog-post-1',
    title: 'The Ultimate Guide to Choosing the Perfect Pillow',
    slug: 'perfect-pillow-guide',
    author: 'Jane Doe',
    excerpt: 'Finding the right pillow is crucial for a good night\'s sleep. In this guide, we cover everything from materials to firmness to help you make the best choice.',
    content: 'A good night\'s sleep is essential for overall health, and your pillow plays a a huge role in the quality of your rest. The right pillow can align your spine, relieve pressure, and prevent neck pain. But with so many options available—memory foam, down, latex, microfiber—how do you choose?\n\nFirst, consider your sleeping position. Side sleepers generally need a firmer, thicker pillow to fill the space between their head and shoulder. Back sleepers should look for a medium-thick pillow to support the natural curve of their neck. Stomach sleepers, on the other hand, need a very thin, soft pillow, or even no pillow at all, to avoid unnatural bending in their neck.',
    imageUrl: 'https://picsum.photos/seed/blog-1/800/450',
    imageAlt: 'A person sleeping comfortably on a pillow.',
    featured: true,
  },
  {
    id: 'blog-post-2',
    title: 'How to Style Your Living Room with Cushions',
    slug: 'styling-with-cushions',
    author: 'John Smith',
    excerpt: 'Cushions are a powerful design tool. Learn how to use different textures, colors, and sizes to transform your living space.',
    content: 'Cushions are one of the easiest and most affordable ways to refresh a room. They add comfort, color, and personality to any sofa or armchair. The key to successful styling is variation. Don\'t be afraid to mix and match different sizes, shapes, and textures. A large square cushion can serve as an anchor, while a smaller lumbar pillow can add support and visual interest.\n\nWhen it comes to color, you can either choose cushions that complement your existing color scheme or use them to introduce a bold accent color. A neutral sofa is the perfect canvas for vibrant cushions. Finally, consider the arrangement. An odd number of cushions, like three or five, often looks more natural and less staged than an even number.',
    imageUrl: 'https://picsum.photos/seed/blog-2/800/450',
    imageAlt: 'A stylish living room with decorative cushions on a sofa.',
    featured: true,
  },
  {
    id: 'blog-post-3',
    title: 'Mattress 101: A Comprehensive Guide',
    slug: 'mattress-101',
    author: 'Emily White',
    excerpt: 'From memory foam to innerspring, buying a mattress can be confusing. Our guide breaks down the types and features to consider.',
    content: 'A mattress is one of the most important purchases you\'ll make for your home, directly impacting your sleep quality and health. The most common types are innerspring, memory foam, latex, and hybrid. Innerspring mattresses offer a traditional bouncy feel and are often more affordable. Memory foam mattresses contour to your body, providing excellent pressure relief. Latex mattresses are known for their durability and natural cooling properties. Hybrid mattresses combine layers of foam or latex with an innerspring system, aiming to provide the best of both worlds.\n\nWhen testing a mattress, lie down in your usual sleeping position for at least 10-15 minutes to get a real feel for it. Pay attention to the firmness level and whether it supports your spine in a neutral position. Most companies now offer generous trial periods, so you can test the mattress at home to be sure it\'s the right fit.',
    imageUrl: 'https://picsum.photos/seed/blog-3/800/450',
    imageAlt: 'Cross-section of a mattress showing different layers.',
    featured: false,
  },
  {
    id: 'blog-post-4',
    title: '5 Reasons to Use a Mattress Protector',
    slug: 'why-use-mattress-protector',
    author: 'Michael Brown',
    excerpt: 'A mattress protector is a small investment that can save you a lot of trouble. Here are five key benefits to protecting your mattress.',
    content: 'A mattress protector is an essential accessory for any bed. First and foremost, it protects your mattress from spills and stains, which can void your mattress warranty. Second, it acts as a barrier against dust mites, allergens, and bed bugs, creating a more hygienic sleeping environment. This is especially important for people with allergies or asthma.\n\nThird, many modern protectors are waterproof yet breathable, preventing liquids from seeping in while still allowing air to circulate, keeping you cool and comfortable. Fourth, they can extend the lifespan of your mattress by protecting it from wear and tear. Finally, a protector is much easier to clean than a mattress—simply toss it in the washing machine. It\'s a simple, effective way to safeguard your investment.',
    imageUrl: 'https://picsum.photos/seed/blog-4/800/450',
    imageAlt: 'A person fitting a mattress protector on a bed.',
    featured: false,
  },
];

async function seedDatabase() {
  console.log('--- Starting Database Seeding ---');

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  console.log('Firebase Initialized.');

  try {
    // Check if blog posts already exist
    const postsCollection = collection(db, 'blogPosts');
    const existingPosts = await getDocs(postsCollection);
    
    if (!existingPosts.empty) {
      console.log('Blog posts already exist in the database. Seeding skipped.');
      console.log('--- Database Seeding Complete ---');
      process.exit(0);
    }
    
    console.log('Seeding blog posts...');
    for (const post of blogPosts) {
      const { id, ...postData } = post;
      await addDoc(postsCollection, {
        ...postData,
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`Added blog post: "${post.title}"`);
    }
    console.log('Successfully seeded blog posts.');

  } catch (error) {
    console.error('Error seeding database:', error);
  }

  console.log('--- Database Seeding Complete ---');
  // The process will hang without this exit call
  process.exit(0);
}

seedDatabase();
