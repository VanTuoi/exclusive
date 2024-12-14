import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { homeApi } from "~/services";
import { DataContact } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useInfoContact() {
    const { showSnackbar } = useCustomSnackbar();

    const getHomeApi = homeApi("client");

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dataContact, setDataContact] = useState<DataContact | null>(null);

    useEffect(() => {
        handleGetFlashSafe();
    }, []);

    const handleGetFlashSafe = async () => {
        try {
            setIsLoading(true);

            const response = await getHomeApi.getAllContactInfo();

            setDataContact(response.data.data);
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
        dataContact
    };
}
