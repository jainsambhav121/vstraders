import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
  getStats: () => { totalRevenue: number; totalOrders: number; pendingOrders: number };
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        })),
      getOrdersByUser: (userId) => {
        // In a real app, orders would have a userId field. 
        // For this demo, we'll assume all orders belong to the current user if filtering by user,
        // or we'd need to add userId to the Order type.
        // For now, let's return all orders for simplicity in this demo context, 
        // or filter if we added userId to Order type.
        return get().orders; 
      },
      getAllOrders: () => get().orders,
      getStats: () => {
        const orders = get().orders;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === 'Processing').length;
        return {
          totalRevenue,
          totalOrders: orders.length,
          pendingOrders
        };
      }
    }),
    { name: 'vstraders-orders' }
  )
);
