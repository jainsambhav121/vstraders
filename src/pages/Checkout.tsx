import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore, useOrderStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
};

export const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();
  const { items, total, clearCart } = useCartStore();
  const { addOrder } = useOrderStore(); 
  const navigate = useNavigate();

  const onSubmit = (data: CheckoutForm) => {
    // Simulate API call
    setTimeout(() => {
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: [...items],
        total: total() * 1.08,
        status: 'Processing' as const
      };
      
      addOrder(newOrder); 
      clearCart();
      navigate('/order-success');
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-100 pb-2">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">First Name</label>
                <input
                  {...register('firstName', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  placeholder="John"
                />
                {errors.firstName && <span className="text-red-500 text-xs mt-1">Required</span>}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Last Name</label>
                <input
                  {...register('lastName', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  placeholder="Doe"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Address</label>
                <input
                  {...register('address', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  placeholder="123 Main St"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">City</label>
                <input
                  {...register('city', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">ZIP Code</label>
                <input
                  {...register('zip', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold mb-6 border-b border-gray-100 pb-2">Payment Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Cardholder Name</label>
                <input
                  {...register('cardName', { required: true })}
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Card Number</label>
                <input
                  {...register('cardNumber', { required: true })}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">Expiry Date</label>
                  <input
                    {...register('expDate', { required: true })}
                    placeholder="MM/YY"
                    className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-gray-500 mb-2">CVV</label>
                  <input
                    {...register('cvv', { required: true })}
                    type="password"
                    maxLength={3}
                    className="w-full bg-gray-50 border-none rounded-none border-b border-gray-200 focus:ring-0 focus:border-black p-3 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-none py-4 text-lg">
            Pay {formatPrice(total() * 1.08)}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 h-fit border border-gray-100">
          <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">Order Summary</h3>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-white border border-gray-200 overflow-hidden">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">{formatPrice((item.discountPrice || item.price) * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%)</span>
                <span>{formatPrice(total() * 0.08)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200 mt-4">
                <span>Total</span>
                <span>{formatPrice(total() * 1.08)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
