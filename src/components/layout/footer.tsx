
'use client';

import Link from 'next/link';
import { Store, Twitter, Facebook, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

export default function Footer() {
  const firestore = useFirestore();
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: z.infer<typeof newsletterSchema>) => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not connect to the database.',
      });
      return;
    }
    try {
      await addDoc(collection(firestore, 'subscriptions'), {
        email: values.email,
        subscribedAt: serverTimestamp(),
      });
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <footer className="bg-muted text-muted-foreground hidden md:block">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Store className="h-6 w-6 text-primary" />
            <span>VSTRADERS</span>
          </Link>
          <p>VSTRADERS is a trusted manufacturer and supplier of premium mattresses, pillows, cushions, and foam products in India. We specialize in PU foam mattresses, memory foam pillows, microfiber cushions, sofa cum beds, and custom comfort solutions for homes.</p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-6 w-6 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-6 w-6 transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-6 w-6 transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-foreground">Shop</h3>
          <ul className="space-y-2">
            <li><Link href="/category/pillows" className="hover:text-primary">Pillows</Link></li>
            <li><Link href="/category/cushions" className="hover:text-primary">Cushions</Link></li>
            <li><Link href="/category/mattresses" className="hover:text-primary">Mattress</Link></li>
            <li><Link href="/category/covers" className="hover:text-primary">Covers</Link></li>
            <li><Link href="/sale" className="hover:text-primary">Sale</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-foreground">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
             <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-foreground">Newsletter</h3>
          <p className="mb-4">Subscribe to our newsletter for weekly updates and promotions.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm items-start space-x-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 text-sm sm:flex-row">
          <p>&copy; {new Date().getFullYear()} VSTRADERS. All Rights Reserved.</p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <span>Payment methods will be displayed here.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
