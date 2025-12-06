import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, reviews } from '../data/mockData';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from '../components/icons';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === Number(id));
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
            setSelectedColor(product.colors[0]);
            setSelectedSize(product.sizes[0]);
            window.scrollTo(0,0);
        }
    }, [product]);

    if (!product) {
        return <div className="text-center py-20">Product not found.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        showToast(`${product.title} added to cart`, "success");
    };

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="text-gray-400 mb-8 text-sm">
                <Link to="/" className="hover:text-white">Home</Link> &gt; 
                <Link to="/shop" className="hover:text-white mx-1">Shop</Link> &gt; 
                <span className="text-white mx-1">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Images */}
                <div className="space-y-4">
                    <div className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10">
                        <img src={mainImage} alt={product.title} className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${mainImage === img ? 'border-white' : 'border-transparent hover:border-white/50'}`}
                            >
                                <img src={img} alt={`${product.title} ${idx}`} className="w-full h-full object-cover"/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                        <div className="flex items-center text-yellow-500 text-sm">
                            {'★'.repeat(Math.round(product.rating))} 
                            <span className="text-gray-400 ml-2">({product.reviewsCount} reviews)</span>
                        </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                    <div className="space-y-6 mb-8">
                        {/* Options */}
                        <div>
                            <span className="block text-sm text-gray-400 mb-2">Color</span>
                            <div className="flex gap-3">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-full border border-white/20 text-sm transition-colors ${selectedColor === color ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="block text-sm text-gray-400 mb-2">Size</span>
                            <div className="flex gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-full border border-white/20 text-sm transition-colors ${selectedSize === size ? 'bg-white text-black font-bold' : 'hover:bg-white/10'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <span className="block text-sm text-gray-400 mb-2">Quantity</span>
                            <div className="flex items-center w-max bg-white/10 border border-white/20 rounded-full">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-white/10 rounded-full"><MinusIcon className="w-4 h-4"/></button>
                                <span className="px-4 font-bold min-w-[3rem] text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-white/10 rounded-full"><PlusIcon className="w-4 h-4"/></button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCartIcon className="w-5 h-5"/> Add to Cart
                        </button>
                    </div>

                    {/* Features */}
                    <div className="mt-8 border-t border-white/10 pt-6">
                        <h3 className="font-bold mb-3">Key Features</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            {product.keyFeatures.map((feat, i) => <li key={i}>{feat}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-white/10 pt-12">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <h4 className="font-bold text-sm">{review.name}</h4>
                                    <div className="text-yellow-500 text-xs">{'★'.repeat(review.rating)}</div>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
                 <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                 </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;