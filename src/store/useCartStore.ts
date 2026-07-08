import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface CartItem extends Product {
  id: string;
  numericPrice: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const id = product.name.toLowerCase().replace(/\s+/g, '-');
          const existingItem = state.items.find((item) => item.id === id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          
          // Parse numeric price, e.g., "₹850" -> 850
          const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
          
          return {
            items: [...state.items, { ...product, id, numericPrice, quantity: 1 }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.numericPrice * item.quantity), 0);
      },
    }),
    {
      name: 'patisserie-cart-storage',
    }
  )
);
