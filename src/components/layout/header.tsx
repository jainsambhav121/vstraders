
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Store,
  Moon,
  Sun,
  Mic
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from '@/components/ui/badge';
import { MobileLink } from './mobile-link';
import { useUser } from '@/hooks/use-user';
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Separator } from '../ui/separator';
import { useCart } from '@/context/cart-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const { user } = useUser();
  const { setTheme } = useTheme();
  const { cartCount } = useCart();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);


  useEffect(() => {
    const checkAdmin = async () => {
      if (user && firestore) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === 'admin' || userData.role === 'manager');
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user, firestore]);

  const profileLink = user ? (isAdmin ? '/dashboard' : '/profile') : '/login';
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
      setIsSearchDialogOpen(false);
    }
  };
  
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support voice search.");
      return;
    }

    if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        setIsListening(true);
    }
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      router.push(`/search?q=${transcript}`);
      setIsSearchDialogOpen(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event.error);
    };

    recognition.onend = () => {
        setIsListening(false);
    }

    recognition.start();
  };


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
            <SheetContent side="left" className="flex flex-col">
              <div className="border-b pb-4">
                <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                  <Store className="h-6 w-6 text-primary" />
                  <span>VSTRADERS</span>
                </Link>
              </div>
              <div className="flex-1 space-y-2 py-6">
                {navLinks.map((link) => (
                    <MobileLink
                    key={link.href}
                    href={link.href}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {link.label}
                  </MobileLink>
                ))}
                 <MobileLink
                    href="/wishlist"
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    Wishlist
                  </MobileLink>
              </div>
               <Separator />
               <div className="py-4 space-y-4">
                 <MobileLink href={profileLink} className="flex items-center gap-2 text-md font-medium">
                    <User className="h-5 w-5" />
                    My Account
                 </MobileLink>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start gap-2 px-0 text-md font-medium">
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span>Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                </Link>
            ))}
            </nav>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-end gap-4">
          <form onSubmit={handleSearch} className="relative hidden w-full max-w-md flex-1 md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-full bg-muted pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleVoiceSearch}
                aria-label="Search with voice"
            >
                <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />
            </Button>
          </form>
           {/* Mobile-only: App name in the center */}
          <div className="flex items-center md:hidden">
             <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                <Store className="h-6 w-6 text-primary" />
                <span>VSTRADERS</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Search" className="md:hidden">
                  <Search className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Search Products</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full bg-muted pl-10 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                    onClick={handleVoiceSearch}
                    aria-label="Search with voice"
                   >
                     <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`} />
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" asChild aria-label="Account">
                <Link href={profileLink}>
                    <User className="h-6 w-6" />
                </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
                    <Link href="/wishlist">
                        <Heart className="h-6 w-6" />
                    </Link>
                </Button>
            </div>

            <Button variant="ghost" size="icon" className="relative" asChild aria-label="Cart">
              <Link href="/cart">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
