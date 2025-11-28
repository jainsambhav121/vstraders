import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, cn } from '../../lib/utils';
import { useCartStore, useWishlistStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

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
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="inline-flex items-center bg-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              New
            </span>
          )}
          {product.isSale && (
            <span className="inline-flex items-center bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/0 text-gray-900 hover:bg-white transition-all rounded-full opacity-0 group-hover:opacity-100"
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1 text-center">
        <h3 className="text-sm font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
        <div className="flex items-center justify-center gap-2 pt-1">
          <p className="text-sm font-semibold text-gray-900">
            {formatPrice(product.discountPrice || product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
