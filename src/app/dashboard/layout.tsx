
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    const checkAdminRole = async () => {
      if (!firestore) return;
      const userDocRef = doc(firestore, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as AppUser;
          if (userData.role === 'admin' || userData.role === 'manager') {
            setIsAuthorized(true);
          } else {
            router.push('/profile');
          }
        } else {
           // If user doc doesn't exist, they can't be an admin.
           router.push('/profile');
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();

  }, [user, authLoading, router, firestore]);

  if (loading || authLoading || !isAuthorized) {
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
