
import React from 'react';
import { customers } from '../../data/mockData';

const CustomersPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Customer Management</h1>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Total Orders</th>
                            <th className="p-4">Total Spent</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                             <tr key={customer.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/5">
                                <td className="p-4">{customer.name}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">{customer.phone}</td>
                                <td className="p-4 text-center">{customer.totalOrders}</td>
                                <td className="p-4">₹{customer.totalSpent.toLocaleString()}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button className="text-gray-400 hover:text-white transition-colors">View</button>
                                        <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
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

export default CustomersPage;
