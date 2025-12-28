

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Store,
  LogOut,
  FileText,
  Mail,
  Newspaper
} from 'lucide-react';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/blog', label: 'Blog', icon: Newspaper },
  { href: '/dashboard/subscriptions', label: 'Subscriptions', icon: Mail },
  { href: '/dashboard/content', label: 'Content', icon: FileText },
];

const bottomLinks = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/', label: 'Back to Store', icon: Store },
];

export function SidebarNav() {
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
        toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        toast({ variant: 'destructive', title: 'Logout Failed', description: 'Could not log you out. Please try again.' });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
        return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-semibold text-sidebar-foreground">VSTRADERS</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(link.href)}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {bottomLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(link.href)}
                  tooltip={link.label}
                >
                  <link.icon />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
             <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Logout"
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
