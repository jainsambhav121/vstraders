import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, cn } from '../../lib/utils';
import { useCartStore, useWishlistStore } from '../../store/useStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              New
            </span>
          )}
          {product.isSale && (
            <span className="bg-purple-600 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Action Buttons (Right Side) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleToggleWishlist}
            className="p-2.5 bg-white text-black rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors"
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500 hover:text-white" : ""} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 bg-white text-black rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Quick Add Button (Bottom) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white/95 backdrop-blur-sm text-black py-3 rounded-lg text-sm font-bold uppercase tracking-wide shadow-lg hover:bg-black hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-purple-500 fill-current" />
            <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-serif font-medium text-black group-hover:text-purple-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 pt-1">
          <p className="text-lg font-bold text-black">
            {formatPrice(product.discountPrice || product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
