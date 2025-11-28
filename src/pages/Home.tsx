import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { categories } from '../data/mockData';
import { useProductStore } from '../store/useProductStore';
import { motion } from 'framer-motion';

export const Home = () => {
  const { products } = useProductStore();
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(2, 6);

  return (
    <div className="space-y-24 pb-24">
      {/* Editorial Hero Section */}
      <section className="relative h-[90vh] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505693416388-b0346d6771b4?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="h-full w-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24 items-center text-center max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 border border-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            Est. 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter"
          >
            THE ART OF<br />SLEEP
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-light"
          >
            Curated collection of premium mattresses and bedding for the modern sanctuary.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-none px-10 uppercase tracking-widest text-sm font-bold">
                Shop Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black rounded-none px-10 uppercase tracking-widest text-sm font-bold">
                Explore
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimalist Features */}
      <section className="container mx-auto px-4 border-b border-gray-100 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <Truck className="h-8 w-8 mx-auto text-black" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Free Shipping</h3>
              <p className="text-gray-500 text-sm">Complimentary delivery on all orders</p>
            </div>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="h-8 w-8 mx-auto text-black" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Warranty</h3>
              <p className="text-gray-500 text-sm">Comprehensive 10-year protection</p>
            </div>
          </div>
          <div className="space-y-4">
            <Clock className="h-8 w-8 mx-auto text-black" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-1">100 Night Trial</h3>
              <p className="text-gray-500 text-sm">Sleep on it, risk-free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-black tracking-tight">Shop by Category</h2>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 hover:opacity-70 transition-opacity">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative h-[400px] overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest border-2 border-white px-6 py-3 bg-black/30 backdrop-blur-sm">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-12 text-center tracking-tight">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative py-32 bg-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Pillow" 
              className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Limited Edition</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">The Perfect<br />Balance</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Discover our new ergonomic series designed for the ultimate restorative sleep. Engineered with precision, crafted for comfort.
            </p>
            <Link to="/shop" className="inline-block pt-4">
              <Button className="rounded-none px-8 uppercase tracking-widest text-xs font-bold">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-black tracking-tight">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-black text-white p-12 md:p-24 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Join the Inner Circle</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto font-light">
            Subscribe to receive exclusive offers, early access to new collections, and design inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:bg-white/20 transition-colors rounded-none text-sm tracking-wide"
            />
            <Button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-none px-8 uppercase tracking-widest text-xs font-bold h-auto py-4">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
