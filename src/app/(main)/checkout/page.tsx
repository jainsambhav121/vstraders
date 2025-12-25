
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUser } from '@/hooks/use-user';
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'A valid phone number is required'),
  address: z.string().min(10, 'A full shipping address is required'),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const shippingCost = cartTotal > 4000 ? 0 : 150;
  const totalAmount = cartTotal + shippingCost;

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  useEffect(() => {
    if (!userLoading && user) {
        form.reset({
            name: user.displayName || '',
            email: user.email || '',
            phone: user.phoneNumber || '',
            address: ''
        })
    }
  }, [user, userLoading, form]);
  
  useEffect(() => {
    if (cartCount === 0 && typeof window !== 'undefined') {
        router.push('/');
    }
  }, [cartCount, router]);
  
  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    if (!firestore) {
        toast({ variant: "destructive", title: "Error", description: "Database not available."});
        return;
    }

    try {
        await addDoc(collection(firestore, 'orders'), {
            customerDetails: values,
            products: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.finalPrice,
            })),
            totalAmount: totalAmount,
            paymentStatus: 'Pending', // Assuming COD or similar, update as needed
            orderStatus: 'Pending',
            createdAt: serverTimestamp(),
        });

        toast({ title: "Order Placed!", description: "Thank you for your purchase. We will contact you shortly." });
        clearCart();
        router.push('/profile/orders');

    } catch (error) {
        console.error("Order placement error:", error);
        toast({ variant: "destructive", title: "Order Failed", description: "There was a problem placing your order." });
    }
  };


  if (userLoading || cartCount === 0) {
      return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CardHeader className="px-0">
        <CardTitle>Checkout</CardTitle>
        <CardDescription>
          Complete your purchase by providing your details below.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Shipping Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123, Main Street, City, State, ZIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
                 </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <Image src={item.primaryImage || 'https://placehold.co/64x64'} alt={item.name} width={64} height={64} className="rounded-md" />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                     </div>
                     <p>₹{(item.finalPrice * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
           <Button variant="outline" className="w-full" asChild>
                <Link href="/cart">Back to Cart</Link>
           </Button>
        </div>
      </div>
    </div>
  );
}
