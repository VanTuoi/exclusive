import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist, PersistOptions } from "zustand/middleware";

import { PromotionData } from "~/types";

interface PromotionState {
    promotions: PromotionData[];
    addPromotion: (promotion: PromotionData) => void;
    removePromotion: (promoCode: string) => void;
}

type PromotionPersist = (
    config: StateCreator<PromotionState, [], [["zustand/devtools", unknown], ["zustand/persist", unknown]]>,
    options: PersistOptions<PromotionState>
) => StateCreator<PromotionState>;

const persistOptions: PersistOptions<PromotionState> = {
    name: "promotionStore",
    storage: createJSONStorage(() => sessionStorage)
};

export const usePromotionStore = create<PromotionState>(
    (persist as PromotionPersist)(
        devtools((set) => ({
            promotions: [],
            addPromotion: (newPromotion: PromotionData) => {
                set((state) => {
                    if (state.promotions.some((promo) => promo.promoCode === newPromotion.promoCode)) {
                        return state;
                    }
                    return {
                        promotions: [...state.promotions, newPromotion]
                    };
                });
            },
            removePromotion: (promoCode: string) => {
                set((state) => ({
                    promotions: state.promotions.filter((promo) => promo.promoCode !== promoCode)
                }));
            }
        })),
        persistOptions
    )
);
