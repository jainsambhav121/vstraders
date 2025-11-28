import React, { useState } from 'react';
import { Tag, Plus, Trash2, Megaphone, Percent } from 'lucide-react';
import { useAdminFeaturesStore } from '../../store/useAdminFeaturesStore';
import { Button } from '../../components/ui/Button';
import { formatPrice } from '../../lib/utils';
import toast from 'react-hot-toast';

export const AdminMarketing = () => {
  const { coupons, addCoupon, deleteCoupon } = useAdminFeaturesStore();
  const [activeTab, setActiveTab] = useState<'coupons' | 'banners'>('coupons');
  
  // New Coupon Form State
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage',
    expiryDate: ''
  });

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      id: Math.random().toString(36).substr(2, 9),
      code: newCoupon.code.toUpperCase(),
      discount: Number(newCoupon.discount),
      type: newCoupon.type as any,
      expiryDate: newCoupon.expiryDate,
      isActive: true
    });
    setNewCoupon({ code: '', discount: 0, type: 'percentage', expiryDate: '' });
    toast.success('Coupon created successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${
            activeTab === 'coupons' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Coupons & Discounts
          {activeTab === 'coupons' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>}
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`pb-4 px-4 font-medium text-sm transition-colors relative ${
            activeTab === 'banners' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Banners & Ads
          {activeTab === 'banners' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></span>}
        </button>
      </div>

      {activeTab === 'coupons' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Coupon Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Plus size={20} /> Create Coupon
              </h3>
              <form onSubmit={handleAddCoupon} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md uppercase"
                    placeholder="SUMMER2024"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newCoupon.type}
                      onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <input
                      type="number"
                      required
                      value={newCoupon.discount}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button type="submit" className="w-full">Create Coupon</Button>
              </form>
            </div>
          </div>

          {/* Coupon List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                  <tr>
                    <th className="px-6 py-3">Code</th>
                    <th className="px-6 py-3">Discount</th>
                    <th className="px-6 py-3">Expiry</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono font-medium text-gray-900 flex items-center gap-2">
                        <Tag size={14} className="text-gray-400" />
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4">
                        {coupon.type === 'percentage' ? `${coupon.discount}% Off` : `₹${coupon.discount} Off`}
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {coupon.isActive ? 'Active' : 'Expired'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteCoupon(coupon.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Banner Management</h3>
          <p className="text-gray-500 mb-6">Manage your homepage sliders and promotional banners here.</p>
          <Button variant="outline">Add New Banner</Button>
        </div>
      )}
    </div>
  );
};
