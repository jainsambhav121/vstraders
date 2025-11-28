import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { products as initialProducts } from '../data/mockData';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    { name: 'vstraders-products' }
  )
);
