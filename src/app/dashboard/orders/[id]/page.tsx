
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function OrderDetailPage() {
  const params = useParams();
  const { id } = params;
  const firestore = useFirestore();
  const router = useRouter();
  const [order, setOrder] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !id) return;

    const docRef = doc(firestore, 'orders', id as string);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setOrder(docSnap.data());
      } else {
        setOrder(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching order:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore, id]);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!order) {
    return notFound();
  }

  const orderDate = order.createdAt?.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">Order Details</h1>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Order #{id.toString().slice(0, 8)}</CardTitle>
          <CardDescription>Date: {orderDate}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="font-semibold">Customer Details</h3>
                <p className="text-sm text-muted-foreground">
                    {order.customerDetails.name}<br />
                    {order.customerDetails.email}<br />
                    {order.customerDetails.phone}<br />
                    {order.customerDetails.address}
                </p>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Order Status</span>
                    <Badge variant={order.orderStatus === 'Delivered' ? 'default' : 'secondary'}>{order.orderStatus}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Status</span>
                    <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{order.paymentStatus}</Badge>
                </div>
                 <Separator />
                <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Products Ordered</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products.map((product: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-center">{product.quantity}</TableCell>
                  <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{(product.price * product.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
         <CardFooter>
            <div className="flex w-full justify-end font-bold">
                <div className="flex w-full max-w-xs justify-between">
                    <span>Grand Total:</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                </div>
            </div>
         </CardFooter>
      </Card>
    </div>
  );
}
