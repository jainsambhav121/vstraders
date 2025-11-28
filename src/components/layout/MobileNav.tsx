import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

export const MobileNav = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Shop', path: '/shop' },
    { icon: Search, label: 'Search', path: '/shop' }, // Could open search modal
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: cartItems.length },
    { icon: User, label: 'Profile', path: '/account' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 relative",
                isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div className="relative">
                <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                {item.badge ? (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
