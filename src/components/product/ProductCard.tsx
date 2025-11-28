import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <span className="inline-flex items-center rounded-full bg-black px-2 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {product.isSale && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              Sale
            </span>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4">
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-white py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50"
          >
            <ShoppingCart size={16} />
            Add
          </button>
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "flex items-center justify-center rounded-md bg-white p-2 text-gray-900 shadow-sm hover:bg-gray-50",
              isWishlisted && "text-red-500"
            )}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{product.category}</p>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-gray-900">
            {formatPrice(product.discountPrice || product.price)}
          </p>
          {product.discountPrice && (
            <p className="text-sm text-gray-400 line-through">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
