
import React, { useState, useEffect } from 'react';
import { MicIcon, CameraIcon, XIcon, ShoppingCartIcon, StarFilledIcon } from './icons';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

// Voice Search Component
interface VoiceSearchProps {
    onSearch: (term: string) => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchProps> = ({ onSearch }) => {
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onSearch(transcript);
            };
            recognition.start();
        } else {
            alert("Voice search is not supported in your browser.");
        }
    };

    return (
        <button 
            onClick={startListening} 
            className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse text-white' : 'text-gray-400 hover:text-white'}`}
            title="Voice Search"
        >
            <MicIcon className="w-5 h-5" />
        </button>
    );
};

// Image Search Component
interface ImageSearchProps {
    onSearch: (term: string) => void;
}

export const ImageSearchButton: React.FC<ImageSearchProps> = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsAnalyzing(true);
            // Simulate image analysis
            setTimeout(() => {
                setIsAnalyzing(false);
                setIsOpen(false);
                // Mock result based on "analysis"
                const terms = ["Cushion", "Pillow", "Mattress", "Sofa"];
                const randomTerm = terms[Math.floor(Math.random() * terms.length)];
                onSearch(randomTerm);
            }, 2000);
        }
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)} 
                className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
                title="Image Search"
            >
                <CameraIcon className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 w-full max-w-md relative">
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                        <h3 className="text-xl font-bold mb-4">Search by Image</h3>
                        <p className="text-gray-400 mb-6">Upload an image to find similar products.</p>
                        
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center py-8">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                                <p>Analyzing image...</p>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/50 transition-colors">
                                <CameraIcon className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                                <label className="block cursor-pointer">
                                    <span className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                        Upload Image
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

// Quick View Modal
interface QuickViewProps {
    product: Product | null;
    onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewProps> = ({ product, onClose }) => {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px]">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-white/5">
                    <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                    <div className="mb-4">
                        <span className="text-xs uppercase tracking-wider text-gray-400">{product.brand}</span>
                        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                        <div className="flex items-center gap-2 mb-2">
                             <div className="flex text-yellow-500">
                                 {'★'.repeat(Math.round(product.rating))}
                                 {'☆'.repeat(5 - Math.round(product.rating))}
                             </div>
                             <span className="text-sm text-gray-400">({product.reviewsCount} reviews)</span>
                        </div>
                        <p className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</p>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{product.description}</p>
                    
                    <div className="space-y-4 mb-8">
                        <div>
                            <span className="text-sm text-gray-400 block mb-2">Color:</span>
                            <div className="flex gap-2">
                                {product.colors.map(c => (
                                    <span key={c} className="px-3 py-1 border border-white/20 rounded-full text-xs">{c}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-400 block mb-2">Size:</span>
                            <div className="flex gap-2">
                                {product.sizes.map(s => (
                                    <span key={s} className="px-3 py-1 border border-white/20 rounded-full text-xs">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => { addToCart(product, 1); onClose(); }}
                        className="w-full bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
                    </button>
                    
                    <div className="mt-4 text-center">
                        <a href={`#/product/${product.id}`} className="text-sm text-gray-400 hover:text-white underline">
                            View Full Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
