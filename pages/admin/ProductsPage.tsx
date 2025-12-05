
import React from 'react';
import { products } from '../../data/mockData';
import { PlusIcon } from '../../components/icons';

const ProductsPage: React.FC = () => {
    const handleEdit = (id: number) => alert(`Editing product ${id}`);
    const handleDelete = (id: number) => alert(`Deleting product ${id}`);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <button className="flex items-center gap-2 bg-white text-black font-bold py-2 px-4 rounded-full hover:bg-gray-200 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-white/20 last:border-b-0 hover:bg-white/5">
                                <td className="p-2">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.title} 
                                        className="w-16 h-16 object-cover rounded-md" 
                                        referrerPolicy="no-referrer"
                                    />
                                </td>
                                <td className="p-4">{product.title}</td>
                                <td className="p-4">{product.category}</td>
                                <td className="p-4">₹{product.price.toLocaleString()}</td>
                                <td className="p-4 text-center">{product.stock}</td>
                                <td className="p-4">
                                    <div className="flex gap-4">
                                        <button onClick={() => handleEdit(product.id)} className="text-gray-400 hover:text-white transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
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

export default ProductsPage;
