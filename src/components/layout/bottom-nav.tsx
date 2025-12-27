
'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/use-user';
import React, { useState } from 'react';


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const profileLink = user ? '/profile' : '/login';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.slice(0,1).map((item) => {
            const isActive = pathname === item.href;
            return (
                 <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span className="text-sm">{item.label}</span>
                </Link>
            )
        })}
         <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
                 <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group text-muted-foreground">
                    <Search className="w-5 h-5 mb-1" />
                    <span className="text-sm">Search</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Products</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full bg-muted pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </DialogContent>
        </Dialog>
        {navItems.slice(1).map((item) => {
            const isActive = pathname === item.href;
            return (
                 <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span className="text-sm">{item.label}</span>
                </Link>
            )
        })}
         <Link
            href={profileLink}
            className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
                pathname === profileLink ? 'text-primary' : 'text-muted-foreground'
            )}
        >
            <User className="w-5 h-5 mb-1" />
            <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
}
