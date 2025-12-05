
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShoppingBagIcon } from '../../components/icons';

const AdminLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            <div className="w-full max-w-sm p-8 space-y-8 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 text-3xl font-bold mb-2">
                        <ShoppingBagIcon className="w-10 h-10"/>
                        <span>VSTRADERS</span>
                    </div>
                    <h1 className="text-2xl font-semibold">Admin Panel Login</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <div>
                        <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-full text-lg hover:bg-gray-200 transition-colors disabled:opacity-50">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
