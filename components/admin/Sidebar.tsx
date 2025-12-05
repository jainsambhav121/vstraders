
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, LayoutDashboardIcon, PackageIcon, ClipboardListIcon, UsersIcon, NewspaperIcon, SettingsIcon, LogOutIcon } from '../icons';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Sidebar: React.FC = () => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { icon: LayoutDashboardIcon, label: 'Dashboard', path: '/admin' },
        { icon: PackageIcon, label: 'Products', path: '/admin/products' },
        { icon: ClipboardListIcon, label: 'Orders', path: '/admin/orders' },
        { icon: UsersIcon, label: 'Customers', path: '/admin/customers' },
        { icon: NewspaperIcon, label: 'Blog', path: '/admin/blog' },
        { icon: SettingsIcon, label: 'Settings', path: '/admin/settings' },
    ];
    
    return (
        <aside className="w-64 bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col p-4 h-full">
            <div className="flex items-center gap-2 text-2xl font-bold p-4 border-b border-white/10 mb-4">
                <ShoppingBagIcon className="w-8 h-8"/>
                <span>VSTRADERS</span>
            </div>
            <nav className="flex-grow">
                <ul>
                    {navItems.map(item => (
                        <li key={item.path}>
                            <NavLink to={item.path} end={item.path === '/admin'} className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg my-1 transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                                <item.icon className="w-6 h-6" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                    <LogOutIcon className="w-6 h-6" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
