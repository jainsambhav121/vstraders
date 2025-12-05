
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, ShoppingCartIcon, UserIcon, SearchIcon, MenuIcon, XIcon, HistoryIcon, TrendingUpIcon, TrashIcon } from './icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { VoiceSearchButton, ImageSearchButton } from './SearchTools';
import { products, trendingSearches } from '../data/mockData';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const stored = localStorage.getItem('recentSearches');
        if (stored) setRecentSearches(JSON.parse(stored));

        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchSubmit = (e?: React.FormEvent, term?: string) => {
        if (e) e.preventDefault();
        const finalQuery = term || searchQuery;
        if (!finalQuery.trim()) return;

        // Save to recent searches
        const updatedRecent = [finalQuery, ...recentSearches.filter(s => s !== finalQuery)].slice(0, 5);
        setRecentSearches(updatedRecent);
        localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));

        setIsSearchFocused(false);
        navigate(`/shop?q=${encodeURIComponent(finalQuery)}`);
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About Us', path: '/about' },
        { name: 'Blogs', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Auto-suggestions logic
    const suggestions = searchQuery 
        ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) 
        : [];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-lg border-b border-white/20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold">
                        <ShoppingBagIcon className="w-8 h-8"/>
                        <span>VSTRADERS</span>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                             <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                                `text-lg hover:text-gray-300 transition-colors ${isActive ? 'underline' : ''}`
                             }>
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Icons & Smart Search */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative" ref={searchContainerRef}>
                             <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-2 w-64 focus-within:ring-2 focus-within:ring-white/50 transition-all">
                                <SearchIcon className="w-5 h-5 text-white/50 ml-2"/>
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                                    className="bg-transparent border-none py-2 px-2 w-full focus:outline-none text-white placeholder-white/50" 
                                />
                                <div className="flex items-center border-l border-white/10 pl-1">
                                    <VoiceSearchButton onSearch={(term) => { setSearchQuery(term); handleSearchSubmit(undefined, term); }} />
                                    <ImageSearchButton onSearch={(term) => { setSearchQuery(term); handleSearchSubmit(undefined, term); }} />
                                </div>
                             </div>

                             {/* Smart Search Dropdown */}
                             {isSearchFocused && (
                                 <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                                     {searchQuery === '' ? (
                                         <div className="p-4">
                                             {recentSearches.length > 0 && (
                                                 <div className="mb-4">
                                                     <div className="flex justify-between items-center mb-2">
                                                         <h3 className="text-xs font-bold text-gray-400 uppercase">Recent Searches</h3>
                                                         <button onClick={clearRecentSearches}><TrashIcon className="w-3 h-3 text-gray-500 hover:text-red-400"/></button>
                                                     </div>
                                                     <ul className="space-y-2">
                                                         {recentSearches.map(term => (
                                                             <li key={term}>
                                                                 <button onClick={() => handleSearchSubmit(undefined, term)} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white w-full text-left">
                                                                     <HistoryIcon className="w-4 h-4 text-gray-500" /> {term}
                                                                 </button>
                                                             </li>
                                                         ))}
                                                     </ul>
                                                 </div>
                                             )}
                                             <div>
                                                 <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Trending Now</h3>
                                                 <ul className="space-y-2">
                                                     {trendingSearches.map(term => (
                                                         <li key={term}>
                                                             <button onClick={() => handleSearchSubmit(undefined, term)} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white w-full text-left">
                                                                 <TrendingUpIcon className="w-4 h-4 text-green-500" /> {term}
                                                             </button>
                                                         </li>
                                                     ))}
                                                 </ul>
                                             </div>
                                         </div>
                                     ) : (
                                         <div className="py-2">
                                             {suggestions.length > 0 ? (
                                                 <ul>
                                                     {suggestions.map(p => (
                                                         <li key={p.id}>
                                                             <button 
                                                                 onClick={() => {
                                                                     navigate(`/product/${p.id}`);
                                                                     setIsSearchFocused(false);
                                                                 }}
                                                                 className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 w-full text-left transition-colors"
                                                             >
                                                                 <img src={p.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                                                                 <div>
                                                                    <p className="text-sm font-semibold">{p.title}</p>
                                                                    <p className="text-xs text-gray-400">{p.category}</p>
                                                                 </div>
                                                             </button>
                                                         </li>
                                                     ))}
                                                     <li className="border-t border-white/10 mt-2 pt-2">
                                                         <button onClick={() => handleSearchSubmit()} className="w-full text-center py-2 text-sm font-bold text-white hover:bg-white/5">
                                                             View all results for "{searchQuery}"
                                                         </button>
                                                     </li>
                                                 </ul>
                                             ) : (
                                                 <div className="p-4 text-center text-gray-400">
                                                     No matches found. Press Enter to search broadly.
                                                 </div>
                                             )}
                                         </div>
                                     )}
                                 </div>
                             )}
                        </div>
                        <NavLink to="/wishlist" aria-label="Wishlist"><HeartIcon className="w-6 h-6 hover:text-gray-300"/></NavLink>
                        <NavLink to="/cart" className="relative" aria-label="Shopping Cart">
                            <ShoppingCartIcon className="w-6 h-6 hover:text-gray-300"/>
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
                        </NavLink>
                        {currentUser ? (
                            <button onClick={handleLogout} aria-label="Logout" className="hover:text-gray-300">
                                <UserIcon className="w-6 h-6"/>
                            </button>
                        ) : (
                            <NavLink to="/auth" aria-label="Login or Signup"><UserIcon className="w-6 h-6 hover:text-gray-300"/></NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
                            {isMobileMenuOpen ? <XIcon className="w-8 h-8"/> : <MenuIcon className="w-8 h-8"/>}
                        </button>
                    </div>
                </div>
            </div>

             {/* Mobile Menu */}
             <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-black/80 backdrop-blur-xl absolute top-20 left-0 right-0 h-[calc(100vh-5rem)] z-50`}>
                <nav className="flex flex-col items-center justify-start pt-10 h-full gap-8 p-4">
                     <div className="w-full max-w-sm relative">
                         <input 
                            type="text" 
                            placeholder="Search products..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter') {
                                    handleSearchSubmit();
                                    setIsMobileMenuOpen(false);
                                }
                            }}
                            className="bg-white/10 border border-white/20 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white/50" 
                        />
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"/>
                    </div>
                    {navLinks.map((link) => (
                        <NavLink key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl hover:text-gray-300 transition-colors">
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
