
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

export const metadata: Metadata = {
  title: 'VSTRADERS',
  description: 'Your one-stop shop for everything you need.',
};

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
