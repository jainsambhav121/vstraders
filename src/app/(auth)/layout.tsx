import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="p-4 sm:p-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Store className="h-6 w-6" />
          <span>VSTRADERS</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
