import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { homeApi } from "~/services";
import { Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useFlashSales() {
    const { showSnackbar } = useCustomSnackbar();

    const getHomeApi = homeApi("client");

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataFlashSafe, setDataFlashSafe] = useState<Product[]>([]);

    useEffect(() => {
        handleGetFlashSafe();
    }, []);

    const handleGetFlashSafe = async () => {
        try {
            setIsLoading(true);

            const response = await getHomeApi.getFlashSafe();

            setDataFlashSafe(response.data.data);
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
        dataFlashSafe
    };
}
