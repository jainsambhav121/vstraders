
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { ShoppingCartIcon, EyeIcon } from './icons';
import { useCart } from '../context/CartContext';
import { QuickViewModal } from './SearchTools';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [showQuickView, setShowQuickView] = useState(false);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleQuickView = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setShowQuickView(true);
    };
    
    return (
        <>
            <Link to={`/product/${product.id}`} className="block group">
                <div className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
                    <div className="aspect-square overflow-hidden relative">
                        <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            referrerPolicy="no-referrer"
                        />
                        {/* Quick View Button (Desktop only mostly, but accessible) */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                                onClick={handleQuickView}
                                className="bg-white text-black font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-200"
                            >
                                Quick View
                            </button>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-lg font-semibold truncate flex-1" title={product.title}>{product.title}</h3>
                             <span className="text-yellow-500 text-sm ml-2">★ {product.rating}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{product.brand}</p>
                        
                        <div className="mt-auto flex justify-between items-center">
                            <p className="text-xl font-bold">₹{product.price.toLocaleString()}</p>
                            <button onClick={handleAddToCart} className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors" aria-label="Add to cart">
                                <ShoppingCartIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
            
            {showQuickView && (
                <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard;
