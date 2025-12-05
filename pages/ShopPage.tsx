
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, synonyms, availableColors, availableSizes, brands, trendingSearches } from '../data/mockData';
import { FilterIcon, GridIcon, ListIcon, XIcon, SearchIcon } from '../components/icons';
import type { Product, FilterState } from '../types';

// Typo tolerance helper (Levenshtein distance)
const levenshteinDistance = (a: string, b: string) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
            else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
};

const ShopPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';
    
    // State
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    // Pagination (Infinite Scroll simulation)
    const [visibleCount, setVisibleCount] = useState(8);
    
    // Sorting
    const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'rating'>('featured');

    // Filters
    const [filters, setFilters] = useState<FilterState>({
        minPrice: 0,
        maxPrice: 150000,
        brands: [],
        colors: [],
        sizes: [],
        minRating: 0,
        categories: []
    });

    useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

    // Handle Infinite Scroll
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.offsetHeight) {
            setVisibleCount(prev => prev + 4);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper: Get Search Terms with Synonyms
    const getExpandedTerms = (query: string) => {
        const terms = query.toLowerCase().split(' ');
        const expanded: string[] = [...terms];
        terms.forEach(term => {
            if (synonyms[term]) expanded.push(...synonyms[term]);
        });
        return expanded;
    };

    // Advanced Filtering Logic
    const filteredProducts = useMemo(() => {
        console.log(`Analyzing search for: ${searchQuery}`); // Analytics Mock

        let result = products;

        // 1. Text Search (Fuzzy + Synonyms)
        if (searchQuery.trim()) {
            const searchTerms = getExpandedTerms(searchQuery);
            result = result.filter(product => {
                const productText = `${product.title} ${product.description} ${product.category} ${product.brand} ${product.sku} ${product.tags.join(' ')}`.toLowerCase();
                
                // Exact/Partial Match
                const hasMatch = searchTerms.some(term => productText.includes(term));
                
                // Fuzzy Match (if no direct match)
                if (!hasMatch) {
                     const words = productText.split(' ');
                     return searchTerms.some(term => 
                        words.some(word => Math.abs(word.length - term.length) < 2 && levenshteinDistance(word, term) <= 2)
                     );
                }
                return hasMatch;
            });
        }

        // 2. Faceted Filters
        result = result.filter(p => 
            p.price >= filters.minPrice && 
            p.price <= filters.maxPrice &&
            (filters.brands.length === 0 || filters.brands.includes(p.brand)) &&
            (filters.colors.length === 0 || p.colors.some(c => filters.colors.includes(c))) &&
            (filters.sizes.length === 0 || p.sizes.some(s => filters.sizes.includes(s))) &&
            (filters.categories.length === 0 || filters.categories.includes(p.category)) &&
            p.rating >= filters.minRating
        );

        // 3. Sorting
        return result.sort((a, b) => {
            if (sortBy === 'priceLow') return a.price - b.price;
            if (sortBy === 'priceHigh') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0; // Featured (default ID order or random)
        });

    }, [searchQuery, filters, sortBy]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    // Handlers
    const toggleFilter = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[type] as string[];
            const updated = current.includes(value) 
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const clearFilters = () => {
        setFilters({
            minPrice: 0,
            maxPrice: 150000,
            brands: [],
            colors: [],
            sizes: [],
            minRating: 0,
            categories: []
        });
        setSearchQuery('');
    };

    const saveSearch = () => {
        alert("Search filters saved to your profile!");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters (Desktop & Mobile) */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-80 bg-zinc-900 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto
                    lg:relative lg:transform-none lg:w-1/4 lg:bg-transparent lg:p-0 lg:block
                    ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center mb-6 lg:hidden">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={() => setIsMobileFilterOpen(false)}><XIcon className="w-6 h-6"/></button>
                    </div>

                    <div className="space-y-8">
                        {/* Categories */}
                        <div>
                            <h3 className="font-bold mb-3 border-b border-white/20 pb-2">Categories</h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.categories.includes(cat)}
                                            onChange={() => toggleFilter('categories', cat)}
                                            className="rounded border-gray-600 text-black focus:ring-white"
                                        />
                                        <span className="text-gray-300">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="font-bold mb-3 border-b border-white/20 pb-2">Price</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <input 
                                    type="number" 
                                    value={filters.minPrice} 
                                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                                    className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
                                />
                                <span>to</span>
                                <input 
                                    type="number" 
                                    value={filters.maxPrice} 
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                    className="w-20 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
                                />
                            </div>
                            <input 
                                type="range" 
                                min="0" max="150000" step="1000"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                className="w-full"
                            />
                        </div>

                        {/* Brands */}
                        <div>
                            <h3 className="font-bold mb-3 border-b border-white/20 pb-2">Brands</h3>
                            <div className="space-y-2">
                                {brands.map(b => (
                                    <label key={b} className="flex items-center space-x-2 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={filters.brands.includes(b)}
                                            onChange={() => toggleFilter('brands', b)}
                                        />
                                        <span className="text-gray-300">{b}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                         {/* Colors */}
                         <div>
                            <h3 className="font-bold mb-3 border-b border-white/20 pb-2">Colors</h3>
                            <div className="flex flex-wrap gap-2">
                                {availableColors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => toggleFilter('colors', c)}
                                        className={`w-8 h-8 rounded-full border-2 ${filters.colors.includes(c) ? 'border-white scale-110' : 'border-transparent'} shadow-sm`}
                                        style={{ backgroundColor: c.toLowerCase() }}
                                        title={c}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <h3 className="font-bold mb-3 border-b border-white/20 pb-2">Minimum Rating</h3>
                            {[4, 3, 2, 1].map(r => (
                                <button 
                                    key={r} 
                                    onClick={() => setFilters(prev => ({...prev, minRating: prev.minRating === r ? 0 : r}))}
                                    className={`flex items-center space-x-1 mb-1 w-full text-left ${filters.minRating === r ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}
                                >
                                    <span className="flex text-yellow-500">{'★'.repeat(r)}{'☆'.repeat(5-r)}</span>
                                    <span>& Up</span>
                                </button>
                            ))}
                        </div>
                        
                        <button onClick={saveSearch} className="w-full py-2 border border-white/20 rounded hover:bg-white/10 text-sm">
                            Save This Search
                        </button>
                    </div>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileFilterOpen(false)} />
                )}

                {/* Main Content */}
                <main className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden p-2 bg-white/10 rounded">
                                <FilterIcon className="w-5 h-5"/>
                            </button>
                            <span className="text-gray-400">{filteredProducts.length} results found</span>
                            {searchQuery && (
                                <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                                    "{searchQuery}" <button onClick={() => setSearchQuery('')}><XIcon className="w-3 h-3"/></button>
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-black/50 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                            
                            <div className="flex bg-white/10 rounded p-1">
                                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400'}`}>
                                    <GridIcon className="w-4 h-4"/>
                                </button>
                                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400'}`}>
                                    <ListIcon className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {visibleProducts.length > 0 ? (
                        <>
                            <div className={viewMode === 'grid' 
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" 
                                : "space-y-6"
                            }>
                                {visibleProducts.map(product => (
                                    viewMode === 'grid' ? (
                                        <ProductCard key={product.id} product={product} />
                                    ) : (
                                        <div key={product.id} className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-colors">
                                            <div className="w-full md:w-48 h-48 md:h-auto">
                                                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover"/>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-1">{product.title}</h3>
                                                        <p className="text-gray-400 text-sm mb-2">{product.category} • {product.brand}</p>
                                                    </div>
                                                    <span className="text-xl font-bold">₹{product.price.toLocaleString()}</span>
                                                </div>
                                                <p className="text-gray-300 mb-4 flex-1">{product.description}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center text-yellow-500 text-sm">
                                                        {'★'.repeat(Math.round(product.rating))} <span className="text-gray-500 ml-2">({product.reviewsCount})</span>
                                                    </div>
                                                    <a href={`#/product/${product.id}`} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                                        View Details
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                            
                            {/* Loader / End of Results */}
                            {visibleCount < filteredProducts.length && (
                                <div className="text-center py-8">
                                    <div className="inline-block animate-spin w-8 h-8 border-4 border-white/20 border-t-white rounded-full"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white/5 rounded-lg border border-white/10">
                            <SearchIcon className="w-16 h-16 mx-auto text-gray-600 mb-4"/>
                            <h2 className="text-2xl font-bold mb-2">No results found</h2>
                            <p className="text-gray-400 mb-6">We couldn't find any products matching your criteria.</p>
                            
                            <div className="max-w-md mx-auto">
                                <p className="mb-4 font-semibold">Try searching for:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {trendingSearches.map(term => (
                                        <button 
                                            key={term} 
                                            onClick={() => { setSearchQuery(term); clearFilters(); }}
                                            className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-sm"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={clearFilters}
                                    className="mt-8 text-white underline hover:text-gray-300"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
