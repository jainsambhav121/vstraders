import React from 'react';
import { useWishlistStore } from '../store/useStore';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Link to="/shop">
          <Button>Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
