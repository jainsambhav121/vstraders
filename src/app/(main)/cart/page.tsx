import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>Review and manage the items in your cart.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">
              Add some products to your cart to see them here.
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
