import { create } from "zustand";
import type { Product } from "../../../shared/types/product";

type WishlistState = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  hasItem: (id: number) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  hasItem: (id) => get().items.some((p) => p.id === id),
  addItem: (product) => {
    if (!get().hasItem(product.id)) {
      set((state) => ({ items: [...state.items, product] }));
    }
  },
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
}));
