import { AxiosError } from "axios";
import { useState } from "react";

import { productApi } from "~/services";
import { Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useProducts() {
    const { showSnackbar } = useCustomSnackbar();

    const getProductApi = productApi("client");

    const [dataProductInCategories, setDataProductInCategories] = useState<[Product] | []>([]);
    const [dataProductDetails, setDataProductDetails] = useState<Product | null>(null);

    const handleGetProducts = async (id: string) => {
        try {
            const response = await getProductApi.getProductDetails(id);

            setDataProductDetails(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetProductInCategories = async (categories: string, limit: number = 10) => {
        try {
            const response = await getProductApi.getProductInCategories(categories, [["limit", limit]]);

            setDataProductInCategories(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    return {
        dataProductDetails,
        dataProductInCategories,
        handleGetProducts,
        handleGetProductInCategories
    };
}
