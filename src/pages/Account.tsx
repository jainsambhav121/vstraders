import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useOrderStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Package, LogOut, User as UserIcon } from 'lucide-react';

export const Account = () => {
  const { user, logout } = useAuthStore();
  const { getOrdersByUser } = useOrderStore();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }
  
  const orders = getOrdersByUser(user.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <UserIcon size={24} />
              </div>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Default Address</h3>
              <p className="text-sm text-gray-600">
                {user.addresses[0].street}<br />
                {user.addresses[0].city}, {user.addresses[0].state} {user.addresses[0].zip}<br />
                {user.addresses[0].country}
              </p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(order.total)}</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 text-sm">
                        <div className="h-12 w-12 bg-gray-100 rounded">
                          <img src={item.image} alt="" className="h-full w-full object-cover rounded" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
