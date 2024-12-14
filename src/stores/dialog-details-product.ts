import { create } from "zustand";

import { Product } from "~/types/product";

interface DialogState {
    product: Product | null;
    isViewDetailOpen: boolean;
    isAddToCartOpen: boolean;
    selectedOptions: { [key: string]: { color: string; size: string } };
    openViewDetail: (product: Product) => void;
    closeViewDetail: () => void;
    openAddToCart: (product: Product) => void;
    closeAddToCart: () => void;
    setSelectedColor: (color: string, id?: number) => void;
    setSelectedSize: (size: string, id?: number) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    isViewDetailOpen: false,
    isAddToCartOpen: false,
    product: null,
    selectedOptions: {},

    openViewDetail: (product) =>
        set(() => ({
            isViewDetailOpen: true,
            product
        })),
    closeViewDetail: () =>
        set(() => ({
            isViewDetailOpen: false,
            product: null
        })),

    openAddToCart: (product) =>
        set(() => ({
            isAddToCartOpen: true,
            isViewDetailOpen: false,
            product: product
        })),
    closeAddToCart: () =>
        set(() => ({
            isAddToCartOpen: false,
            product: null
        })),

    setSelectedColor: (color: string, id?: number) => {
        if (id === undefined) return;

        set((state) => ({
            selectedOptions: {
                ...state.selectedOptions,
                [id]: {
                    ...(state.selectedOptions[id] || {}),
                    color: color
                }
            }
        }));
    },

    setSelectedSize: (size: string, id?: number) => {
        if (id === undefined) return;

        set((state) => ({
            selectedOptions: {
                ...state.selectedOptions,
                [id]: {
                    ...(state.selectedOptions[id] || {}),
                    size: size
                }
            }
        }));
    }
}));
