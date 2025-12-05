
import React from 'react';
import { orders } from '../../data/mockData';

const OrdersPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Order Management</h1>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4 text-right">Total</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/5">
                                <td className="p-4 font-mono">{order.id}</td>
                                <td className="p-4">{order.customerName}</td>
                                <td className="p-4">{order.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>{order.status}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="p-4 text-right">₹{order.total.toLocaleString()}</td>
                                <td className="p-4">
                                     <div className="flex gap-4">
                                        <button className="text-gray-400 hover:text-white transition-colors">View</button>
                                        <button className="text-gray-400 hover:text-white transition-colors">Update</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
