
import React from 'react';
import StatCard from '../../components/admin/StatCard';
import { products, orders, customers } from '../../data/mockData';
import { PackageIcon, ClipboardListIcon, UsersIcon, DollarSignIcon } from '../../components/icons';

const DashboardPage: React.FC = () => {
    const totalRevenue = orders
        .filter(order => order.status === 'Delivered' && order.paymentStatus === 'Paid')
        .reduce((sum, order) => sum + order.total, 0);

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSignIcon} />
                <StatCard title="Total Orders" value={orders.length.toString()} icon={ClipboardListIcon} />
                <StatCard title="Total Products" value={products.length.toString()} icon={PackageIcon} />
                <StatCard title="Total Customers" value={customers.length.toString()} icon={UsersIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 h-80 flex items-center justify-center">
                    <p className="text-gray-400">Sales Analytics Chart - Coming Soon</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 h-80 flex items-center justify-center">
                    <p className="text-gray-400">Top Selling Products - Coming Soon</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-white/10">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
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
                                    <td className="p-4 text-right font-semibold">₹{order.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default DashboardPage;
