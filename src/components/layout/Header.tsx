import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
import { useCartStore, useWishlistStore, useAuthStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Support', path: '/support' },
  ];

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsMenuOpen(false);
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">VSTRADERS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    location.pathname === link.path ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-50 rounded-full"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <Link to="/wishlist" className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative hover:bg-gray-50 rounded-full">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </Link>

              <Link to="/cart" className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative hover:bg-gray-50 rounded-full">
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gray-900 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <Link to="/account" className="p-2 text-gray-600 hover:text-gray-900 transition-colors hover:bg-gray-50 rounded-full">
                  <User size={20} />
                </Link>
              ) : (
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="hidden md:inline-flex ml-2"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 z-40"
            >
              <div className="container mx-auto max-w-3xl">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-400"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <button 
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg text-base font-medium ${
                      location.pathname === link.path 
                        ? 'bg-gray-50 text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="pt-4 px-4">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      Login / Register
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
