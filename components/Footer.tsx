
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingBagIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-white/20 mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                    <div className="flex flex-col items-center md:items-start">
                         <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
                            <ShoppingBagIcon className="w-8 h-8"/>
                            <span>VSTRADERS</span>
                        </NavLink>
                        <p className="text-gray-400 max-w-sm">
                            Bringing comfort to your home with our premium collection of pillows, mattresses, and more.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-lg font-semibold mb-2">Ready to transform your comfort?</p>
                        <NavLink to="/shop" className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors">
                            Shop Now
                        </NavLink>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/20 pt-4 text-center text-gray-500">
                    <p>© 2025 VSTRADERS. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;