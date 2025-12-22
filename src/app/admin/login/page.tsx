
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { FirebaseError } from 'firebase/app';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.'}),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});


export default function AdminLoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [pageMode, setPageMode] = useState<'loading' | 'login' | 'signup'>('loading');

  useEffect(() => {
    const checkAdmins = async () => {
        if (!firestore) return;
        try {
            const adminsQuery = query(
                collection(firestore, 'users'), 
                where('role', 'in', ['admin', 'manager']), 
                limit(1)
            );
            const adminSnapshot = await getDocs(adminsQuery);
            if (adminSnapshot.empty) {
                setPageMode('signup');
            } else {
                setPageMode('login');
            }
        } catch (error) {
            console.error("Error checking for admins:", error);
            // Default to login mode on error to avoid locking out admins if Firestore check fails
            setPageMode('login');
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not verify admin status. Please try again.',
            });
        }
    };
    checkAdmins();
  }, [firestore, toast]);
  

  const form = useForm({
    resolver: zodResolver(pageMode === 'login' ? loginSchema : signupSchema),
    defaultValues: {
      name: '',
      email: 'vsadmin123@gmail.com',
      password: 'admin-(121)#',
    },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    if (!auth || !firestore) return;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        if (userData.role === 'admin' || userData.role === 'manager') {
          toast({ title: 'Admin Login Successful', description: 'Welcome back!' });
          router.push('/dashboard');
        } else {
          await auth.signOut();
          toast({ variant: 'destructive', title: 'Authorization Failed', description: 'You are not authorized to access the admin panel.' });
        }
      } else {
        await auth.signOut();
        toast({ variant: 'destructive', title: 'Authorization Failed', description: 'User role not found.' });
      }
    } catch (error) {
      handleAuthError(error, 'Login Failed');
    }
  };

  const handleSignup = async (values: z.infer<typeof signupSchema>) => {
    if (!auth || !firestore) return;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: values.name });

        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            name: values.name,
            email: user.email,
            role: 'admin',
            isActive: true,
            createdAt: serverTimestamp(),
            totalSpent: 0,
            orderCount: 0,
        });

        toast({ title: 'Admin Account Created', description: 'Welcome to the dashboard!' });
        router.push('/dashboard');

    } catch (error) {
        handleAuthError(error, 'Sign Up Failed');
    }
  };
  
  const handleAuthError = (error: any, title: string) => {
      console.error('Admin auth error:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use. Please use a different email or log in.';
            break;
          default:
            errorMessage = 'An authentication error occurred. Please try again.';
        }
      }
      toast({
        variant: 'destructive',
        title: title,
        description: errorMessage,
      });
  }

  const onSubmit = pageMode === 'login' ? form.handleSubmit(handleLogin) : form.handleSubmit(handleSignup);

  if (pageMode === 'loading') {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{pageMode === 'login' ? 'Admin Login' : 'Create Admin Account'}</CardTitle>
          <CardDescription>
            {pageMode === 'login' ? 'Enter your credentials to access the dashboard' : 'Set up the first administrator account for your store.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="grid gap-4"
            >
              {pageMode === 'signup' && (
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                    ? (pageMode === 'login' ? 'Logging in...' : 'Creating Account...')
                    : (pageMode === 'login' ? 'Login' : 'Create Admin Account')
                }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
