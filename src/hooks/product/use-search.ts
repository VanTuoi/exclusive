import { AxiosError } from "axios";
import { useState } from "react";

import { productApi } from "~/services";
import { Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useSearch() {
    const { showSnackbar } = useCustomSnackbar();

    const getProductApi = productApi("client");

    const [dataProductByName, setDataProductByName] = useState<[Product] | []>([]);

    const handleGetProductByName = async (name: string = "") => {
        try {
            if (!name || name === "") {
                setDataProductByName([]);
                return;
            }

            const response = await getProductApi.getProductByName([["search", name]]);

            setDataProductByName(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    return {
        dataProductByName,
        handleGetProductByName
    };
}
