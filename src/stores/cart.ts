import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

import { Product } from "~/types/product";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedOptions: { color: string; size: string };
}

interface CartState {
    items: { [key: number]: CartItem };
    updateItem: (product: Product, quantity: number, options: { color?: string; size?: string }) => void;
    removeFromCart: (id: number) => void;
    removeAllInCart: () => void;
}

type CartPersist = (
    config: StateCreator<CartState, [], [["zustand/persist", unknown]]>,
    options: PersistOptions<CartState>
) => StateCreator<CartState>;

const persistOptions: PersistOptions<CartState> = {
    name: "cartStore",
    storage: createJSONStorage(() => localStorage)
};

export const useCartStore = create<CartState>(
    (persist as CartPersist)(
        (set) => ({
            items: {},

            updateItem: (product, quantity, options) => {
                set((state) => {
                    const item = state.items[product.id];
                    const newQuantity = (item ? item.quantity : 0) + quantity;

                    if (newQuantity < 1) {
                        const newItems = { ...state.items };
                        delete newItems[product.id];
                        return { items: newItems };
                    }

                    return {
                        items: {
                            ...state.items,
                            [product.id]: {
                                product,
                                quantity: newQuantity,
                                selectedOptions: {
                                    color: options.color ?? item?.selectedOptions.color ?? "",
                                    size: options.size ?? item?.selectedOptions.size ?? ""
                                }
                            }
                        }
                    };
                });
            },

            removeFromCart: (id) => {
                set((state) => {
                    const newItems = { ...state.items };
                    delete newItems[id];
                    return { items: newItems };
                });
            },

            removeAllInCart: () => {
                set(() => ({
                    items: {}
                }));
            }
        }),
        persistOptions
    )
);
