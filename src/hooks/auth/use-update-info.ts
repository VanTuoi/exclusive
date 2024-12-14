import { AxiosError } from "axios";
import { useState } from "react";

import { userApi } from "~/services";
import { UpdateUserData } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useUpdateInfo() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { showSnackbar } = useCustomSnackbar();

    const getUserApi = userApi("client");

    const handleUpdateInfo = async (updateUserData: UpdateUserData) => {
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            await getUserApi.changeInfo(updateUserData);

            showSnackbar("Update successful", "success");
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                showSnackbar(errorMessage, "error");
                return errorMessage;
            }
            showSnackbar("Unknown error occurred", "error");
            return "Unknown error occurred";
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleUpdateInfo };
}
