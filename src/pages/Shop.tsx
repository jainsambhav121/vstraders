import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { categories } from '../data/mockData';
import { useProductStore } from '../store/useProductStore';
import { Button } from '../components/ui/Button';
import { cn, formatPrice } from '../lib/utils';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  
  const { products } = useProductStore();
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      // Optional: Reset category if searching
    }
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = activeCategory === 'all' || product.category.toLowerCase() === activeCategory.toLowerCase();
      const matchPrice = (product.discountPrice || product.price) >= priceRange[0] && (product.discountPrice || product.price) <= priceRange[1];
      const matchSearch = searchQuery 
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchCategory && matchPrice && matchSearch;
    });
  }, [activeCategory, priceRange, searchQuery, products]);

  const handleCategoryChange = (cat: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, 100000]);
  };

  return (
    <div className="container mx-auto px-4 py-12 pt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-black">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Shop All Products'}
          </h1>
          <p className="text-gray-500 mt-2">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="md:hidden w-full flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} /> Filters
        </Button>
      </div>

      {/* Active Filters Tags */}
      {(activeCategory !== 'all' || searchQuery || priceRange[1] < 100000) && (
        <div className="flex flex-wrap gap-2 mb-8">
          {activeCategory !== 'all' && (
            <button 
              onClick={() => handleCategoryChange('all')}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-black hover:bg-gray-200"
            >
              Category: {categories.find(c => c.id === activeCategory)?.name || activeCategory} <X size={14} />
            </button>
          )}
          {searchQuery && (
            <button 
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('search');
                setSearchParams(newParams);
              }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-black hover:bg-gray-200"
            >
              Search: {searchQuery} <X size={14} />
            </button>
          )}
          {priceRange[1] < 100000 && (
            <button 
              onClick={() => setPriceRange([0, 100000])}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-black hover:bg-gray-200"
            >
              Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])} <X size={14} />
            </button>
          )}
          <button 
            onClick={clearFilters}
            className="text-sm text-gray-500 underline hover:text-black ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={cn(
          "w-full md:w-64 space-y-10 shrink-0",
          showFilters ? "block" : "hidden md:block"
        )}>
          <div>
            <h3 className="font-bold text-black mb-4 text-lg font-serif">Categories</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleCategoryChange('all')}
                className={cn(
                  "block w-full text-left text-sm transition-colors",
                  activeCategory === 'all' ? "font-bold text-purple-600" : "text-gray-500 hover:text-black"
                )}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "block w-full text-left text-sm transition-colors",
                    activeCategory === cat.id ? "font-bold text-purple-600" : "text-gray-500 hover:text-black"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-black mb-4 text-lg font-serif">Price Range</h3>
            <div className="space-y-6">
              <input
                type="range"
                min="0"
                max="100000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-sm font-medium text-black">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
