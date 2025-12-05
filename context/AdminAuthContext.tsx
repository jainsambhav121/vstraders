
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminAuthContextType {
    isAdmin: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') === 'true');

    const login = (username: string, password: string): boolean => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('isAdmin', 'true');
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        sessionStorage.removeItem('isAdmin');
        setIsAdmin(false);
    };

    return (
        <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = (): AdminAuthContextType => {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
