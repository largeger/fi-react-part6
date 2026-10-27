import { create } from "zustand";
import type { Product } from "../../../shared/types/product";

export type CartItem = { productId: number; name: string; price: number; quantity: number };
type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.productId === product.id);
      if (existing) {
        // Nur das passende Element wird durch eine neue Objektkopie ersetzt.
        return {
          items: state.items.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        items: [...state.items, { productId: product.id, name: product.name, price: product.price, quantity: 1 }],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
  clear: () => set({ items: [] }),
}));

// Summen sind abgeleitete Werte und werden nicht als separater State gespeichert.
// Das verhindert, dass Warenkorbartikel und Summen irgendwann auseinanderlaufen.
export function calculateCart(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };
}
