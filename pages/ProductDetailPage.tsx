
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products, reviews } from '../data/mockData';
import { MinusIcon, PlusIcon } from '../components/icons';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === parseInt(id || ''));
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const { addToCart } = useCart();

    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    if (!product) {
        return <div className="text-center py-20">Product not found.</div>;
    }

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };
    
    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${quantity} x ${product.title} added to cart!`);
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                    <div className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 mb-4">
                        <img 
                            src={mainImage} 
                            alt={product.title} 
                            className="w-full h-full object-cover transition-opacity duration-300"
                            referrerPolicy="no-referrer" 
                        />
                    </div>
                    {/* Changed to flex-wrap so all thumbnails are visible without scrolling */}
                    <div className="flex gap-2 flex-wrap">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setMainImage(img)} className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-white' : 'border-transparent'}`}>
                                <img 
                                    src={img} 
                                    alt={`${product.title} thumbnail ${index + 1}`} 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <span className="text-gray-400 uppercase tracking-wider">{product.category}</span>
                    <h1 className="text-4xl font-bold my-2">{product.title}</h1>
                    <p className="text-3xl font-bold mb-4">₹{product.price.toFixed(2)}</p>
                    <p className="text-gray-300 mb-6">{product.description}</p>
                    
                    <h3 className="font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                        {product.keyFeatures.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center bg-white/10 border border-white/20 rounded-full">
                            <button onClick={() => handleQuantityChange(-1)} className="p-3"><MinusIcon className="w-5 h-5"/></button>
                            <span className="px-4 text-lg font-bold">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="p-3"><PlusIcon className="w-5 h-5"/></button>
                        </div>
                         <button onClick={handleAddToCart} className="flex-1 bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <section>
                 <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10">
                            <div className="flex items-center mb-4">
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <div className="flex">{'⭐'.repeat(review.rating)}</div>
                                </div>
                            </div>
                            <p className="text-gray-300">{`"${review.comment}"`}</p>
                        </div>
                    ))}
                 </div>
            </section>

             {/* Related Products */}
             <section>
                <h2 className="text-3xl font-bold text-center mb-8">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
             </section>
        </div>
    );
};

export default ProductDetailPage;
