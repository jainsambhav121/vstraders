
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

const HomePage: React.FC = () => {
    const heroSlides = [
        'https://picsum.photos/id/119/1600/600',
        'https://picsum.photos/id/137/1600/600',
        'https://picsum.photos/id/145/1600/600',
    ];

    const newArrivals = products.slice(0, 4);
    const bestSellers = products.slice(4, 8);
    
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] w-full text-white">
                 <Carousel autoSlide={true}>
                    {heroSlides.map((s, i) => (
                        <div key={i} className="min-w-full h-[60vh] md:h-[80vh] relative">
                             <img src={s} className="w-full h-full object-cover" alt={`Slide ${i+1}`} />
                             <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ))}
                </Carousel>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Experience Ultimate Comfort</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl">Discover our premium collection of pillows, mattresses, and more, designed for your perfect rest.</p>
                    <Link to="/shop" className="mt-8 bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform hover:scale-105">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Category Section */}
            <section className="container mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                 <div className="flex justify-center flex-wrap gap-4">
                     {categories.map(category => (
                        <Link key={category} to="/shop" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 px-6 hover:bg-white/20 transition-colors">
                            {category}
                        </Link>
                     ))}
                 </div>
            </section>

            {/* New Arrivals Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {newArrivals.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellers.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
