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
  const { addOrder } = useOrderStore(); // Use global order store
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
      
      addOrder(newOrder); // Add to global store
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/account');
    }, 1500);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  {...register('firstName', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
                {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  {...register('lastName', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  {...register('address', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  {...register('city', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  {...register('zip', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  {...register('cardName', { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  {...register('cardNumber', { required: true })}
                  placeholder="0000 0000 0000 0000"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    {...register('expDate', { required: true })}
                    placeholder="MM/YY"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    {...register('cvv', { required: true })}
                    type="password"
                    maxLength={3}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 p-2 border"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Place Order ({formatPrice(total() * 1.08)})
          </Button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gray-200 overflow-hidden">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <span>{item.name} x {item.quantity}</span>
                </div>
                <span>{formatPrice((item.discountPrice || item.price) * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(total() * 0.08)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
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
