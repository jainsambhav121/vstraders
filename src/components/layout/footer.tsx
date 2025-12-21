import Link from 'next/link';
import { Store, Twitter, Facebook, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Store className="h-6 w-6 text-primary" />
            <span>VSTRADERS</span>
          </Link>
          <p>Your one-stop shop for the latest and greatest products.</p>
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
            <li><Link href="/category/cushion" className="hover:text-primary">Cushion</Link></li>
            <li><Link href="/category/mattress" className="hover:text-primary">Mattress</Link></li>
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
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-foreground">Newsletter</h3>
          <p className="mb-4">Subscribe to our newsletter for weekly updates and promotions.</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
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
