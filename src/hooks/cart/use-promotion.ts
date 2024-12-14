import { AxiosError } from "axios";
import { useState } from "react";

import { cartApi } from "~/services";
import { PromotionData } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function usePromotion() {
    const { showSnackbar } = useCustomSnackbar();

    const getCartApi = cartApi("client");

    const [dataPromotion, setDataPromotion] = useState<PromotionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleGetPromotion = async (promotionCode: string) => {
        try {
            setIsLoading(true);

            const response = await getCartApi.getPromotion(promotionCode);

            setDataPromotion(response.data.data);

            return response.data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        dataPromotion,
        handleGetPromotion
    };
}
