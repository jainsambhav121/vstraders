import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>The items you love, all in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
            <h3 className="text-xl font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your wishlist yet.
            </p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
