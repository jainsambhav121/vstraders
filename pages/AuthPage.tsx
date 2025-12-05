
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { EyeIcon, EyeOffIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const commonInputClasses = "w-full bg-white/10 border border-white/20 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors";

    const AuthForm: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [fullName, setFullName] = useState('');
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            setMessage('');

            if (isLogin) {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    setMessage('Logged in successfully! Redirecting...');
                    // onAuthStateChanged in AuthContext will trigger redirect via useEffect above.
                } catch (err: any) {
                    setError(getFriendlyErrorMessage(err.code));
                    setLoading(false);
                }
            } else {
                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    setLoading(false);
                    return;
                }
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    setMessage('Account created successfully! Please log in.');
                    setIsLogin(true); // Switch to login view
                } catch (err: any) {
                    setError(getFriendlyErrorMessage(err.code));
                } finally {
                    setLoading(false);
                }
            }
        };
        
        const handlePasswordReset = async () => {
            const resetEmail = prompt('Please enter your email address to reset your password.');
            if (resetEmail) {
                try {
                    await sendPasswordResetEmail(auth, resetEmail);
                    alert('Password reset email sent! Check your inbox.');
                } catch (err: any) {
                    alert(`Error: ${getFriendlyErrorMessage(err.code)}`);
                }
            }
        };
        
        const getFriendlyErrorMessage = (code: string) => {
            switch (code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    return 'Invalid email or password.';
                case 'auth/invalid-email':
                    return 'Please enter a valid email address.';
                case 'auth/email-already-in-use':
                    return 'An account with this email already exists.';
                case 'auth/weak-password':
                    return 'Password should be at least 6 characters.';
                default:
                    return 'An unexpected error occurred. Please try again.';
            }
        };

        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-center">{isLogin ? 'Login' : 'Create Account'}</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label htmlFor="signup-name" className="sr-only">Full Name</label>
                            <input id="signup-name" type="text" placeholder="Full Name" className={commonInputClasses} required value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input id="email" type="email" placeholder="Email Address" className={commonInputClasses} required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input 
                            id="password" 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password" 
                            className={`${commonInputClasses} pr-12`} 
                            required 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                         <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                    {!isLogin && (
                        <div className="relative">
                            <label htmlFor="signup-confirm-password" className="sr-only">Confirm Password</label>
                            <input 
                                id="signup-confirm-password" 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                placeholder="Confirm Password" 
                                className={`${commonInputClasses} pr-12`} 
                                required 
                                value={confirmPassword} 
                                onChange={e => setConfirmPassword(e.target.value)} 
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-white"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}

                    <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-3 rounded-full text-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>
                {isLogin && (
                    <div className="text-center">
                        <button onClick={handlePasswordReset} className="text-sm text-gray-400 hover:text-white">Forgot password?</button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/20 rounded-lg p-8">
                <div className="flex justify-center bg-black/20 rounded-full p-1 mb-6">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${isLogin ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                        aria-pressed={isLogin}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`w-1/2 py-2 rounded-full font-semibold transition-colors ${!isLogin ? 'bg-white text-black' : 'hover:bg-white/10'}`}
                         aria-pressed={!isLogin}
                    >
                        Sign Up
                    </button>
                </div>
                
                <AuthForm isLogin={isLogin} />
            </div>
        </div>
    );
};

export default AuthPage;
