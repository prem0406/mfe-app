import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create(
  devtools(
    (set) => ({
      items: [],

      addItem: (product) =>
        set(
          (state) => {
            const existing = state.items.find((i) => i.id === product.id);
            return {
              items: existing
                ? state.items.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
                  )
                : [...state.items, { ...product, qty: 1 }],
            };
          },
          false,
          "cart/addItem",
        ),

      clear: () => set({ items: [] }, false, "cart/clear"),
    }),
    { name: "cart-store" },
  ),
);

// Selectors return primitives so they're safe and cheap
export const selectCount = (s) => s.items.reduce((n, i) => n + i.qty, 0);
export const selectTotal = (s) =>
  s.items.reduce((n, i) => n + i.price * i.qty, 0);
