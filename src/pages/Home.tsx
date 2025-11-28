import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { categories } from '../data/mockData';
import { useProductStore } from '../store/useProductStore';
import { motion } from 'framer-motion';

const CountdownTimer = () => (
  <div className="flex gap-4 text-center">
    {['02', '14', '35', '42'].map((val, i) => (
      <div key={i} className="flex flex-col">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold text-white mb-1 font-serif">
          {val}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/70">
          {['Days', 'Hours', 'Mins', 'Secs'][i]}
        </span>
      </div>
    ))}
  </div>
);

export const Home = () => {
  const { products } = useProductStore();
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(2, 6);

  return (
    <div className="bg-white pb-20">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1505693416388-b0346d6771b4?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Bedroom"
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-purple-500"></span>
              <span className="text-purple-400 font-medium uppercase tracking-widest text-sm">Premium Sleep Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6 tracking-tight">
              Experience the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 italic">Art of Comfort</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg font-light">
              Transform your bedroom into a sanctuary with our handcrafted mattresses and ethically sourced bedding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" variant="purple" className="w-full sm:w-auto px-8">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black px-8">
                  Explore Our Story
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-gray-300 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-purple-400" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-purple-400" />
                <span>10-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-purple-400" />
                <span>100-Night Trial</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Fixed Spacing */}
      <section className="container mx-auto px-4 md:px-8 py-16 relative z-20">
        <div className="text-center mb-12">
           <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Collections</span>
           <h2 className="text-4xl font-serif font-bold text-black">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/shop?category=${cat.id}`} className="group block relative h-80 rounded-md overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                
                {/* Content - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                   <div className="border border-white/30 p-6 backdrop-blur-sm bg-white/5 w-full h-full flex flex-col items-center justify-center transition-all duration-500 group-hover:border-white/80 group-hover:bg-black/40">
                     <h3 className="text-3xl font-serif font-bold text-white tracking-wide mb-2 italic">
                        {cat.name}
                     </h3>
                     <span className="text-white text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-b border-white pb-1">
                       Explore
                     </span>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-3 block">Curated For You</span>
          <h2 className="text-5xl font-serif font-bold text-black mb-4">Best Sellers</h2>
          <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link to="/shop">
            <Button variant="outline" className="px-12 py-4 text-sm tracking-widest uppercase border-black hover:bg-black hover:text-white transition-all duration-300">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2000" alt="Background" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-600/20 text-purple-400 border border-purple-600/30 text-xs font-bold uppercase tracking-widest mb-6">
                Limited Time Offer
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-none">
                Sleep Better,<br /> <span className="italic text-gray-400">Live Better</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 font-light">
                Get up to <span className="text-purple-500 font-bold">40% OFF</span> on our premium memory foam mattress collection. Includes 2 free luxury pillows.
              </p>
              <Button variant="purple" size="lg" className="px-10">Shop The Sale</Button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-2xl">
              <p className="text-center text-gray-400 uppercase tracking-widest text-xs mb-6">Offer Ends In</p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 container mx-auto px-4 md:px-8 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-black mb-2">Trending Now</h2>
            <p className="text-gray-500 font-light text-lg">Discover what everyone is talking about.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center text-purple-600 font-medium hover:text-black transition-colors uppercase tracking-wider text-sm">
            View Collection <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[600px] rounded-2xl overflow-hidden group shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000" 
              alt="Lifestyle" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-2 block">New Arrival</span>
              <h3 className="text-4xl font-serif font-bold text-white mb-4 italic">The Royal Suite Collection</h3>
              <p className="text-gray-300 mb-8 max-w-md font-light text-lg">Hotel-quality bedding brought straight to your home. Experience 1000 thread count luxury.</p>
              <Button variant="white" className="bg-white text-black hover:bg-purple-600 hover:text-white border-none px-8">Explore</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 content-between">
            {trendingProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="bg-black rounded-3xl p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Star className="text-purple-500 w-10 h-10 mx-auto mb-8 fill-current" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Join the Comfort Club</h2>
            <p className="text-gray-300 mb-10 text-lg font-light">
              Subscribe to receive exclusive offers, early access to new collections, and expert sleep tips delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all"
              />
              <Button variant="purple" className="px-10 py-4 rounded-full">Subscribe</Button>
            </form>
            <p className="text-gray-500 text-xs mt-6">By subscribing, you agree to our Privacy Policy and Terms.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
