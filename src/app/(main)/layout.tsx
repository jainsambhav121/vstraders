import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BottomNav from '@/components/layout/bottom-nav';
import BackToTopButton from '@/components/layout/back-to-top-button';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
      <BackToTopButton />
    </div>
  );
}
