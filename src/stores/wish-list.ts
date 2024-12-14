import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

import { Product } from "~/types/product";

export interface WishListItem {
    product: Product;
    selectedOptions: { color: string; size: string };
}

interface WishListState {
    items: { [key: number]: WishListItem };
    toggleWishList: (product: Product, options: { color: string; size: string }) => void;
    isProductInWishList: (id?: number) => boolean;
}

type WishListPersist = (
    config: StateCreator<WishListState, [], [["zustand/persist", unknown]]>,
    options: PersistOptions<WishListState>
) => StateCreator<WishListState>;

const persistOptions: PersistOptions<WishListState> = {
    name: "wishListStore",
    storage: createJSONStorage(() => localStorage)
};

export const useWishList = create<WishListState>(
    (persist as WishListPersist)(
        (set, get) => ({
            items: {},

            toggleWishList: (product, options) => {
                set((state) => {
                    const items = { ...state.items };
                    const isInWishList = items[product.id];

                    if (
                        isInWishList &&
                        isInWishList.selectedOptions.color === options.color &&
                        isInWishList.selectedOptions.size === options.size
                    ) {
                        delete items[product.id];
                    } else {
                        items[product.id] = {
                            product,
                            selectedOptions: {
                                color: options.color,
                                size: options.size
                            }
                        };
                    }

                    return { items };
                });
            },

            isProductInWishList: (id) => {
                if (!id) return false;
                return !!get().items[id];
            }
        }),
        persistOptions
    )
);
