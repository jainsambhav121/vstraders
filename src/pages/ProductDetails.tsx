import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, Heart } from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { useCartStore, useWishlistStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct } = useProductStore();
  const product = getProduct(id || '');
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!product) return <div className="text-center py-20">Product not found</div>;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    toast.success('Added to cart');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-yellow-400">
                <Star className="fill-current" size={20} />
                <span className="ml-1 text-gray-900 font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{product.reviews} Reviews</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Options */}
          <div className="space-y-6">
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Size</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-900 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Color</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-900 hover:border-gray-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 border-t border-gray-100 pt-8">
            <div className="w-24">
              <label className="sr-only">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 py-3 text-base focus:border-gray-900 focus:ring-gray-900"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toggleWishlist(product)}
              className={isWishlisted ? "text-red-500 border-red-200 bg-red-50" : ""}
            >
              <Heart className={isWishlisted ? "fill-current" : ""} />
            </Button>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={20} />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield size={20} />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
