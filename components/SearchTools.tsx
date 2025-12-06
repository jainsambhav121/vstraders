
import React, { useState } from 'react';
import { MicIcon, CameraIcon, XIcon, ShoppingCartIcon } from './icons';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { analyzeImageForSearch } from '../services/geminiService';
import { useToast } from '../context/ToastContext';

// Voice Search Component
interface VoiceSearchProps {
    onSearch: (term: string) => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchProps> = ({ onSearch }) => {
    const [isListening, setIsListening] = useState(false);
    const { showToast } = useToast();

    const startListening = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event: any) => {
                setIsListening(false);
                showToast("Voice search error. Please try again.", "error");
            };
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onSearch(transcript);
            };
            recognition.start();
        } else {
            showToast("Voice search is not supported in this browser.", "error");
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
    const { showToast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Check file size (max 4MB)
            if (file.size > 4 * 1024 * 1024) {
                showToast("Image size too large. Please upload under 4MB.", "error");
                return;
            }

            setIsAnalyzing(true);
            
            try {
                // Convert to Base64
                const base64Data = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Remove Data URL prefix (e.g., "data:image/jpeg;base64,")
                        const base64Content = result.split(',')[1];
                        resolve(base64Content);
                    };
                    reader.onerror = error => reject(error);
                });

                // Call Gemini API
                const searchTerm = await analyzeImageForSearch(base64Data, file.type);
                
                if (searchTerm) {
                    onSearch(searchTerm);
                    showToast(`Found: ${searchTerm}`, "success");
                    setIsOpen(false);
                } else {
                    showToast("Could not identify product. Please try another image.", "error");
                }
            } catch (error) {
                console.error("Image analysis failed", error);
                showToast("Failed to analyze image. Please try again.", "error");
            } finally {
                setIsAnalyzing(false);
            }
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
                        <p className="text-gray-400 mb-6">Upload a photo to find similar products using AI.</p>
                        
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center py-8">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                                <p className="text-gray-300">Analyzing image...</p>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/50 transition-colors bg-white/5">
                                <CameraIcon className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                                <label className="block cursor-pointer">
                                    <span className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                        Upload Image
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                                <p className="mt-4 text-xs text-gray-500">Supports JPG, PNG (Max 4MB)</p>
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
    const { showToast } = useToast();

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product, 1);
        showToast(`${product.title} added to cart`, "success");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] shadow-2xl">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 backdrop-blur"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-white/5 relative">
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
                             <div className="flex text-yellow-500 text-sm">
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
                                    <span key={c} className="px-3 py-1 border border-white/20 rounded-full text-xs hover:border-white cursor-default transition-colors">{c}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-sm text-gray-400 block mb-2">Size:</span>
                            <div className="flex gap-2">
                                {product.sizes.map(s => (
                                    <span key={s} className="px-3 py-1 border border-white/20 rounded-full text-xs hover:border-white cursor-default transition-colors">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleAddToCart}
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
