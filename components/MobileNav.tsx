
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, HeartIcon, ShoppingCartIcon, UserIcon } from './icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const MobileNav: React.FC = () => {
    const { cartCount } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };
    
    const navLinks = [
        { name: 'Home', path: '/', icon: HomeIcon },
        { name: 'Wishlist', path: '/wishlist', icon: HeartIcon },
        { name: 'Cart', path: '/cart', icon: ShoppingCartIcon, count: cartCount },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/20 z-40">
            <div className="flex justify-around items-center h-16">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full gap-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`
                        }
                    >
                        <div className="relative">
                            <link.icon className="w-6 h-6" />
                            {link.count !== undefined && link.count > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{link.count}</span>
                            )}
                        </div>
                        <span className="text-xs">{link.name}</span>
                    </NavLink>
                ))}
                {currentUser ? (
                    <button onClick={handleLogout} className="flex flex-col items-center justify-center w-full gap-1 text-gray-400 hover:text-white">
                        <UserIcon className="w-6 h-6" />
                        <span className="text-xs">Logout</span>
                    </button>
                ) : (
                    <NavLink
                        to="/auth"
                        className={({ isActive }) => `flex flex-col items-center justify-center w-full gap-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <UserIcon className="w-6 h-6" />
                        <span className="text-xs">Profile</span>
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default MobileNav;
