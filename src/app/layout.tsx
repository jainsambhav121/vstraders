
import type { Metadata } from 'next';
import { Open_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { MobileExperienceProvider } from '@/components/mobile-experience-provider';
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { RecentlyViewedProvider } from '@/context/recently-viewed-context';
import { Suspense } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-admin',
});

// This function is now async to fetch SEO settings
export async function generateMetadata(): Promise<Metadata> {
  // Initialize firebase admin to fetch data on server
  const { firestore } = initializeFirebase();

  try {
    const settingsDoc = await getDoc(doc(firestore, 'settings', 'main'));
    if (settingsDoc.exists()) {
      const settings = settingsDoc.data();
      return {
        title: settings.metaTitle || 'VSTRADERS',
        description: settings.metaDescription || 'Your one-stop shop for everything you need.',
        keywords: settings.metaKeywords,
      };
    }
  } catch (error) {
    console.error("Failed to fetch SEO settings:", error);
  }

  // Fallback metadata
  return {
    title: 'VSTRADERS',
    description: 'Your one-stop shop for everything you need.',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${playfairDisplay.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  <Suspense>
                    <MobileExperienceProvider>{children}</MobileExperienceProvider>
                  </Suspense>
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </FirebaseClientProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
