import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Store
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/data';
import { MobileLink } from './mobile-link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <Store className="h-6 w-6 text-primary" />
            <span>VSTRADERS</span>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="grid gap-4 py-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                  <Store className="h-6 w-6 text-primary" />
                  <span>VSTRADERS</span>
                </Link>
                {categories.map((category) => (
                    <MobileLink
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {category.name}
                  </MobileLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className="transition-colors hover:text-foreground">
                    {category.name}
                </Link>
            ))}
            </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden w-full max-w-sm md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-full bg-muted pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Search" className="md:hidden">
                  <Search className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Products</DialogTitle>
                </DialogHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full bg-muted pl-10"
                  />
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" asChild aria-label="Account">
              <Link href="/login">
                <User className="h-6 w-6" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
                <Link href="/wishlist">
                    <Heart className="h-6 w-6" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild aria-label="Cart">
              <Link href="/cart">
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">3</Badge>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
