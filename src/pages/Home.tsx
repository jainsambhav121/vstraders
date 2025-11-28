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
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505693416388-b0346d6771b4?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm font-medium mb-6"
          >
            Premium Home Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Sleep in Luxury,<br /> Wake up Refreshed.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 mb-10 max-w-xl leading-relaxed"
          >
            Discover our premium collection of mattresses, pillows, and bedding designed for your ultimate comfort and health.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4"
          >
            <Link to="/shop">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 border-transparent px-8">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900 px-8">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-50 p-4 rounded-xl">
              <Truck className="h-8 w-8 text-gray-900" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-500 leading-relaxed">Enjoy free delivery on all orders over $100, delivered directly to your doorstep.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-50 p-4 rounded-xl">
              <ShieldCheck className="h-8 w-8 text-gray-900" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">10 Year Warranty</h3>
              <p className="text-gray-500 leading-relaxed">We stand behind our quality with a comprehensive 10-year warranty on mattresses.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6 p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-50 p-4 rounded-xl">
              <Clock className="h-8 w-8 text-gray-900" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">100 Night Trial</h3>
              <p className="text-gray-500 leading-relaxed">Try it risk-free at home for 100 nights. If you don't love it, we'll take it back.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/shop" className="group text-gray-900 flex items-center gap-2 text-sm font-semibold hover:underline">
            View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative h-[400px] overflow-hidden rounded-2xl">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                <span className="inline-flex items-center text-white text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Shop Now <ArrowRight size={14} className="ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-gray-800 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-gray-400 font-medium tracking-widest uppercase text-sm mb-4 block">Limited Time Offer</span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Summer Sale is Live</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Upgrade your sleep sanctuary with up to 40% off on selected mattresses and premium bedding accessories.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 h-auto text-lg">
              Shop the Sale
            </Button>
          </Link>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-50 rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
