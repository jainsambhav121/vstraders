import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { XIcon } from '../components/icons';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[60] flex flex-col gap-2 w-full max-w-sm px-4">
                {toasts.map(toast => (
                    <div 
                        key={toast.id} 
                        className={`
                            flex items-center justify-between p-4 rounded-lg shadow-2xl backdrop-blur-xl border
                            transition-all duration-300 animate-in slide-in-from-bottom-2
                            ${toast.type === 'success' ? 'bg-green-500/90 border-green-400 text-white' : ''}
                            ${toast.type === 'error' ? 'bg-red-500/90 border-red-400 text-white' : ''}
                            ${toast.type === 'info' ? 'bg-blue-500/90 border-blue-400 text-white' : ''}
                        `}
                    >
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-80 hover:opacity-100">
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};