import { AxiosError } from "axios";
import { useState } from "react";

import { productApi } from "~/services";
import { Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useProduct() {
    const { showSnackbar } = useCustomSnackbar();

    const getProductApi = productApi("client");

    const [dataProductDetails, setDataProductDetails] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleGetProducts = async (idProduct: string) => {
        try {
            setIsLoading(true);
            const response = await getProductApi.getProductDetails(idProduct);

            setDataProductDetails(response.data.data);
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
        dataProductDetails,
        handleGetProducts
    };
}
