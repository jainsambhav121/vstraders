import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Download, Filter } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

// Mock Data for Payments
const transactions = [
  { id: 'TRX-98765', user: 'John Doe', amount: 29999, status: 'Success', date: '2024-03-20', method: 'Credit Card' },
  { id: 'TRX-98764', user: 'Jane Smith', amount: 1499, status: 'Success', date: '2024-03-19', method: 'UPI' },
  { id: 'TRX-98763', user: 'Mike Johnson', amount: 5000, status: 'Failed', date: '2024-03-19', method: 'Net Banking' },
  { id: 'TRX-98762', user: 'Sarah Wilson', amount: 34999, status: 'Success', date: '2024-03-18', method: 'Credit Card' },
];

export const AdminPayments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payments & Transactions</h1>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200">
            <Filter size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(1245000)}</h3>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="text-xs text-green-600 font-medium">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Settlements</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(45000)}</h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">To be processed in 24h</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Refunds Processed</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(12000)}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ArrowDownLeft size={20} />
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">4 requests this week</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Transaction ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Method</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{trx.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{trx.user}</td>
                  <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                  <td className="px-6 py-4 text-gray-500">{trx.method}</td>
                  <td className="px-6 py-4 font-medium">{formatPrice(trx.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      trx.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
