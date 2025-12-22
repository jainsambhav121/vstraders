
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { useUser } from '@/hooks/use-user';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { User as AppUser } from '@/lib/types';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    if (authLoading || !firestore) {
      return; // Wait until auth state and firestore are loaded
    }

    if (!user) {
      router.push('/login');
      return;
    }

    const checkAdminRole = async () => {
      const userDocRef = doc(firestore, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as AppUser;
          if (userData.role === 'admin' || userData.role === 'manager') {
            setAuthStatus('authorized');
          } else {
            setAuthStatus('unauthorized');
            router.push('/profile');
          }
        } else {
           // If user doc doesn't exist, they can't be an admin.
           setAuthStatus('unauthorized');
           router.push('/profile');
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setAuthStatus('unauthorized');
        router.push('/');
      }
    };

    checkAdminRole();

  }, [user, authLoading, router, firestore]);

  if (authStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (authStatus !== 'authorized') {
    // This will show the loading spinner while redirecting
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen font-admin">
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
