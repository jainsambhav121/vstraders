import React from 'react';
import { Save, Bell, Lock, CreditCard, Globe } from 'lucide-react';
import { useAdminFeaturesStore } from '../../store/useAdminFeaturesStore';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  const { settings, updateSettings } = useAdminFeaturesStore();

  const handleSave = () => {
    toast.success('System settings updated successfully');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save size={18} /> Save Changes
        </Button>
      </div>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Globe size={20} /> General Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSettings({ siteName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => updateSettings({ supportEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => updateSettings({ currency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 pt-6">
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${settings.maintenanceMode ? 'bg-gray-900' : 'bg-gray-300'}`}
              onClick={() => updateSettings({ maintenanceMode: !settings.maintenanceMode })}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Bell size={20} /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Order Confirmation Emails</p>
              <p className="text-sm text-gray-500">Send automated emails when a customer places an order.</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Low Stock Alerts</p>
              <p className="text-sm text-gray-500">Notify admins when product inventory is running low.</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
          </div>
        </div>
      </div>

      {/* Payment Gateways */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard size={20} /> Payment Gateways
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-600 rounded"></div>
              <span className="font-medium">Stripe</span>
            </div>
            <Button size="sm" variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-indigo-600 rounded"></div>
              <span className="font-medium">Razorpay</span>
            </div>
            <Button size="sm" variant="outline">Configure</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
