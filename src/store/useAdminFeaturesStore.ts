import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Customer' | 'Support';
  status: 'Active' | 'Banned';
  joinDate: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiryDate: string;
  isActive: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  user: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  lastReply?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface AdminFeaturesState {
  users: AdminUser[];
  coupons: Coupon[];
  tickets: SupportTicket[];
  faqs: FAQ[];
  settings: {
    siteName: string;
    supportEmail: string;
    maintenanceMode: boolean;
    currency: string;
  };
  
  // Actions
  addUser: (user: AdminUser) => void;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
  deleteUser: (id: string) => void;
  
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  
  addFAQ: (faq: FAQ) => void;
  deleteFAQ: (id: string) => void;
  
  updateSettings: (settings: Partial<AdminFeaturesState['settings']>) => void;
}

export const useAdminFeaturesStore = create<AdminFeaturesState>()(
  persist(
    (set) => ({
      users: [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-15' },
        { id: '2', name: 'Jane Smith', email: 'jane@admin.com', role: 'Admin', status: 'Active', joinDate: '2023-11-20' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', status: 'Banned', joinDate: '2024-02-10' },
      ],
      coupons: [
        { id: '1', code: 'WELCOME20', discount: 20, type: 'percentage', expiryDate: '2024-12-31', isActive: true },
        { id: '2', code: 'SUMMER500', discount: 500, type: 'fixed', expiryDate: '2024-08-31', isActive: true },
      ],
      tickets: [
        { id: 'T-101', subject: 'Order not received', user: 'john@example.com', status: 'Open', priority: 'High', date: '2024-03-20' },
        { id: 'T-102', subject: 'Return request', user: 'mike@example.com', status: 'In Progress', priority: 'Medium', date: '2024-03-19' },
        { id: 'T-103', subject: 'Product inquiry', user: 'sarah@test.com', status: 'Resolved', priority: 'Low', date: '2024-03-18' },
      ],
      faqs: [
        { id: '1', question: 'What is the return policy?', answer: 'You can return items within 30 days of delivery.' },
        { id: '2', question: 'Do you ship internationally?', answer: 'Yes, we ship to select countries worldwide.' },
      ],
      settings: {
        siteName: 'VSTRADERS',
        supportEmail: 'support@vstraders.com',
        maintenanceMode: false,
        currency: 'INR',
      },

      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, data) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u))
      })),
      deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
      
      addCoupon: (coupon) => set((state) => ({ coupons: [...state.coupons, coupon] })),
      deleteCoupon: (id) => set((state) => ({ coupons: state.coupons.filter((c) => c.id !== id) })),
      
      updateTicketStatus: (id, status) => set((state) => ({
        tickets: state.tickets.map((t) => (t.id === id ? { ...t, status } : t))
      })),
      
      addFAQ: (faq) => set((state) => ({ faqs: [...state.faqs, faq] })),
      deleteFAQ: (id) => set((state) => ({ faqs: state.faqs.filter((f) => f.id !== id) })),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
    }),
    { name: 'vstraders-admin-features' }
  )
);
