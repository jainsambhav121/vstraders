
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
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

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const createUserDocument = async (
    uid: string,
    email: string,
    name: string,
    isNewUser: boolean = false
  ) => {
    if (!firestore) return;
    const userRef = doc(firestore, 'users', uid);

    if(isNewUser) {
        const userDoc = await getDoc(userRef);
        if(userDoc.exists()) {
            return; // Document already exists, do nothing.
        }
    }
    
    await setDoc(userRef, {
      uid,
      name,
      email,
      role: 'customer',
      isActive: true,
      createdAt: serverTimestamp(),
      totalSpent: 0,
      orderCount: 0,
    }, { merge: true });
  };

  const handleEmailSignUp = async (values: z.infer<typeof formSchema>) => {
    if (!auth) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const name = `${values.firstName} ${values.lastName}`;
      await updateProfile(user, { displayName: name });
      await createUserDocument(user.uid, user.email!, name);

      toast({ title: 'Account Created', description: "Welcome to VSTRADERS!" });
      router.push('/');
    } catch (error) {
      console.error('Sign up error:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof FirebaseError) {
          switch (error.code) {
              case 'auth/email-already-in-use':
                  errorMessage = 'This email address is already in use.';
                  break;
              case 'auth/invalid-email':
                  errorMessage = 'Please enter a valid email address.';
                  break;
              case 'auth/weak-password':
                  errorMessage = 'The password is too weak.';
                  break;
              default:
                  errorMessage = 'Failed to create an account. Please try again.';
          }
      }
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: errorMessage,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await createUserDocument(user.uid, user.email!, user.displayName || 'Google User', true);

      toast({ title: 'Account Created', description: "Welcome!" });
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/cancelled-popup-request') {
        // User closed the popup, do nothing
        return;
      }
      console.error('Google sign up error:', error);
       toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: 'Could not sign up with Google. Please try again.',
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEmailSignUp)}
            className="grid gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Robinson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
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
                <FormItem className="grid gap-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating Account...' : 'Create an account'}
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignUp}>
          Sign up with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
