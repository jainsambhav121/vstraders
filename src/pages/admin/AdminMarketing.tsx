import React, { useState } from 'react';
import { Tag, Plus, Trash2, Megaphone, Image as ImageIcon } from 'lucide-react';
import { useAdminFeaturesStore } from '../../store/useAdminFeaturesStore';
import { Button } from '../../components/ui/Button';
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

  // Mock Banners State (Local for now as it wasn't in global store)
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale', image: 'https://images.unsplash.com/photo-1505693416388-b0346d6771b4', active: true },
    { id: 2, title: 'New Arrivals', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6', active: false }
  ]);

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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-medium text-gray-900">Active Banners</h3>
             <Button size="sm" className="flex items-center gap-2"><Plus size={16} /> Add Banner</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group">
                <div className="relative h-48">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${banner.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="font-medium">{banner.title}</span>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-500 hover:bg-gray-100 rounded"><ImageIcon size={16} /></button>
                     <button className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
