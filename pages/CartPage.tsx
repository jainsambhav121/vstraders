
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon } from '../components/icons';

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, cartCount } = useCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
            {cartCount === 0 ? (
                <div className="text-center">
                    <p className="text-gray-400 text-lg mb-4">Your cart is empty.</p>
                    <Link to="/shop" className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/5 p-4 rounded-lg border border-white/10">
                                <div className="flex items-center">
                                    <img 
                                        src={item.images[0]} 
                                        alt={item.title} 
                                        className="w-20 h-20 rounded-md object-cover mr-4" 
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="flex-grow">
                                        <h2 className="font-bold text-lg">{item.title}</h2>
                                        <p className="text-gray-400">₹{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0">
                                    <div className="flex items-center bg-white/10 border border-white/20 rounded-full">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><MinusIcon className="w-4 h-4"/></button>
                                        <span className="px-3 font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><PlusIcon className="w-4 h-4"/></button>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="font-bold w-24 text-right">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-400 hover:text-white">&times;</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10 h-fit">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-400">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t border-white/20 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                         <button className="mt-6 w-full bg-white text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
