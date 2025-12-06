import React from 'react';
import StatCard from '../../components/admin/StatCard';
import { products, orders, customers } from '../../data/mockData';
import { PackageIcon, ClipboardListIcon, UsersIcon, DollarSignIcon } from '../../components/icons';

const DashboardPage: React.FC = () => {
    const totalRevenue = orders
        .filter(order => order.status === 'Delivered' && order.paymentStatus === 'Paid')
        .reduce((sum, order) => sum + order.total, 0);

    const recentOrders = orders.slice(0, 5);

    // Mock data for charts
    const monthlySales = [45, 60, 75, 50, 80, 95]; // Example percentages
    const topProducts = products.slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSignIcon} />
                <StatCard title="Total Orders" value={orders.length.toString()} icon={ClipboardListIcon} />
                <StatCard title="Total Products" value={products.length.toString()} icon={PackageIcon} />
                <StatCard title="Total Customers" value={customers.length.toString()} icon={UsersIcon} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 h-80 flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Sales Analytics (Last 6 Months)</h3>
                    <div className="flex-grow flex items-end justify-between gap-2 px-2 pb-2">
                        {monthlySales.map((height, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                <div className="text-xs text-transparent group-hover:text-white transition-colors">{height}%</div>
                                <div 
                                    className="w-full bg-white/20 hover:bg-white/40 rounded-t-md transition-all duration-500"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <div className="text-xs text-gray-500">M{i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 h-80 flex flex-col overflow-hidden">
                    <h3 className="text-xl font-bold mb-4">Top Selling Products</h3>
                    <div className="overflow-y-auto pr-2 space-y-3">
                        {topProducts.map((product, idx) => (
                            <div key={product.id} className="flex items-center gap-4 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                                <span className="font-bold text-gray-500 w-4">#{idx+1}</span>
                                <img src={product.images[0]} alt="" className="w-10 h-10 rounded-md object-cover"/>
                                <div className="flex-grow min-w-0">
                                    <p className="font-semibold truncate">{product.title}</p>
                                    <p className="text-xs text-gray-400">{product.category}</p>
                                </div>
                                <span className="font-bold">₹{product.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
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
                                <tr key={order.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-mono text-sm">{order.id}</td>
                                    <td className="p-4">{order.customerName}</td>
                                    <td className="p-4 text-gray-400">{order.date}</td>
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