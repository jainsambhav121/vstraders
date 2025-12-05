
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPostPage from './pages/BlogPostPage';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import AIChatbot from './components/AIChatbot';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminRoutes from './AdminRoutes';

const MainApp: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-black text-white font-serif">
        <Header />
        <main className="flex-grow pt-20 pb-16 md:pb-0">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </main>
        <Footer />
        <MobileNav />
        <AIChatbot />
    </div>
);


const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <AdminAuthProvider>
                    <HashRouter>
                        <Routes>
                            <Route path="/admin/*" element={<AdminRoutes />} />
                            <Route path="/*" element={<MainApp />} />
                        </Routes>
                    </HashRouter>
                </AdminAuthProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
