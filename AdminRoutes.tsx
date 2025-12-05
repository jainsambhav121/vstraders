
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';

import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ProductsPage from './pages/admin/ProductsPage';
import OrdersPage from './pages/admin/OrdersPage';
import CustomersPage from './pages/admin/CustomersPage';
import BlogManagementPage from './pages/admin/BlogManagementPage';
import SettingsPage from './pages/admin/SettingsPage';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAdmin } = useAdminAuth();
    return isAdmin ? children : <Navigate to="/admin/login" />;
};

const AdminRoutes: React.FC = () => {
    const { isAdmin } = useAdminAuth();
    return (
        <Routes>
            <Route path="/login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLoginPage />} />
            <Route path="/*" element={
                <PrivateRoute>
                    <AdminLayout>
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/customers" element={<CustomersPage />} />
                            <Route path="/blog" element={<BlogManagementPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="*" element={<Navigate to="/admin" />} />
                        </Routes>
                    </AdminLayout>
                </PrivateRoute>
            } />
        </Routes>
    );
};

export default AdminRoutes;
