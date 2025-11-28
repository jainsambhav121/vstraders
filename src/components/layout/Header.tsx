import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, X, Menu } from 'lucide-react';
import { useCartStore, useWishlistStore, useAuthStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Determine text color based on scroll and page (assume dark header on home initially if transparent)
  // For Black & White theme, we want high contrast.
  const isHome = location.pathname === '/';
  const headerTextColor = isScrolled || !isHome ? "text-black" : "text-white";
  const headerBg = isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent";

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          headerBg,
          isScrolled ? "py-3" : "py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="relative z-10 group">
              <h1 className={cn(
                "text-2xl md:text-3xl font-bold tracking-tighter transition-colors",
                headerTextColor
              )}>
                VS<span className="text-purple-600">TRADERS</span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Mattresses', path: '/shop?category=mattresses' },
                { name: 'Pillows', path: '/shop?category=pillows' },
                { name: 'Blog', path: '/blog' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wider transition-colors hover:text-purple-600 relative group",
                    headerTextColor
                  )}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn("p-2 transition-colors hover:text-purple-600", headerTextColor)}
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <Link to="/wishlist" className={cn("p-2 transition-colors hover:text-purple-600 relative hidden md:block", headerTextColor)}>
                <Heart size={20} strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-600" />
                )}
              </Link>

              <Link to="/cart" className={cn("p-2 transition-colors hover:text-purple-600 relative hidden md:block", headerTextColor)}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link to={isAuthenticated ? "/account" : "/login"} className={cn("p-2 transition-colors hover:text-purple-600 hidden md:block", headerTextColor)}>
                <User size={20} strokeWidth={1.5} />
              </Link>

              <button 
                className={cn("md:hidden p-2", headerTextColor)}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-xl z-[60] py-8 shadow-2xl"
          >
            <div className="container mx-auto px-4 relative">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-0 text-gray-400 hover:text-black"
              >
                <X size={24} />
              </button>
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto mt-4">
                <div className="relative border-b-2 border-gray-200 focus-within:border-purple-600 transition-colors">
                  <input
                    type="text"
                    placeholder="Search for luxury bedding..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full py-4 bg-transparent text-2xl md:text-4xl font-serif text-black placeholder-gray-300 focus:outline-none"
                  />
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-black hover:text-purple-600">
                    <Search size={32} strokeWidth={1} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <nav className="flex flex-col space-y-6">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Shop All', path: '/shop' },
                  { name: 'Mattresses', path: '/shop?category=mattresses' },
                  { name: 'Pillows', path: '/shop?category=pillows' },
                  { name: 'Bedsheets', path: '/shop?category=bedsheets' },
                  { name: 'Blog', path: '/blog' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-2xl font-serif text-black hover:text-purple-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-auto space-y-6 border-t border-gray-100 pt-8">
                <Link to="/account" className="flex items-center gap-3 text-lg font-medium text-black">
                  <User size={24} /> Account
                </Link>
                <Link to="/support" className="flex items-center gap-3 text-lg font-medium text-black">
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-xs">?</div>
                  Support
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
