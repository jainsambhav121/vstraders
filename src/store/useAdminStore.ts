import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAdminAuthenticated: boolean;
  adminUser: { name: string; email: string } | null;
  loginAdmin: (email: string) => void;
  logoutAdmin: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminAuthenticated: false,
      adminUser: null,
      loginAdmin: (email) => set({ isAdminAuthenticated: true, adminUser: { name: 'Admin User', email } }),
      logoutAdmin: () => set({ isAdminAuthenticated: false, adminUser: null }),
    }),
    { name: 'vstraders-admin' }
  )
);
