
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <Sidebar />
      </div>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
          <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black p-4 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
