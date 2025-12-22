
'use client';

import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({ variant: 'destructive', title: 'Logout Failed', description: 'Could not log you out. Please try again.' });
    }
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <Card>
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{user.displayName || 'User'}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-full space-y-4">
             <Button variant="outline" className="w-full">
                Order History
             </Button>
             <Button variant="outline" className="w-full">
                Account Settings
             </Button>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="w-full max-w-xs">
            <LogOut className="mr-2" /> Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
