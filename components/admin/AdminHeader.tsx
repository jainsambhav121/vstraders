
import React from 'react';
import { MenuIcon } from '../icons';

interface AdminHeaderProps {
    toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
    return (
        <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4 md:hidden">
            <button onClick={toggleSidebar} aria-label="Toggle sidebar">
                <MenuIcon className="w-6 h-6" />
            </button>
        </header>
    );
};

export default AdminHeader;
