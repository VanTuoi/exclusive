import { PromotionData, ResponseData } from "~/types";

import { API_URLS } from "~/constants/api";

import { getApi } from "~/utils/api-selector";

export const cartApi = (type: "server" | "client" = "client") => {
    const api = getApi(type);

    return {
        getPromotion: (promotionCode: string) => {
            return api.post<ResponseData<PromotionData>>(API_URLS.PUBLIC_API.PROMOTION, {
                promotionCode
            });
        }
    };
};
