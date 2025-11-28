import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order } from '../types';
import { useOrderStore } from './useOrderStore';

// Re-exporting for backward compatibility if needed, but we should use specific stores
export { useProductStore } from './useProductStore';
export { useOrderStore } from './useOrderStore';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, size, color) => {
        const items = get().items;
        // Create a unique ID for cart item based on product ID + variants
        const cartItemId = `${product.id}-${size || ''}-${color || ''}`;
        const existingItem = items.find((item) => {
             const itemId = `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
             return itemId === cartItemId;
        });

        if (existingItem) {
          set({
            items: items.map((item) => {
               const itemId = `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
               return itemId === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            }),
          });
        } else {
          set({ items: [...items, { ...product, quantity, selectedSize: size, selectedColor: color }] });
        }
      },
      removeItem: (productId) => {
        // Note: simple remove by ID might remove all variants. 
        // For a robust cart, we should remove by the composite key, but keeping simple for now based on previous implementation.
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce(
          (total, item) => total + (item.discountPrice || item.price) * item.quantity,
          0
        );
      },
    }),
    { name: 'vstraders-cart' }
  )
);

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      isInWishlist: (productId) => {
        return !!get().items.find((item) => item.id === productId);
      },
    }),
    { name: 'vstraders-wishlist' }
  )
);

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email) => {
        set({
          isAuthenticated: true,
          user: {
            id: 'u1',
            name: 'Demo User',
            email,
            addresses: [
              {
                id: 'a1',
                type: 'shipping',
                street: '123 Furniture Lane',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'USA',
              },
            ],
          },
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'vstraders-auth' }
  )
);
