import { AxiosError } from "axios";

import { authApi } from "~/services";
import { useAuthStore } from "~/stores";

export function useGetMe() {
    const { setInfo } = useAuthStore();

    const getUserApi = authApi("client");

    const handleGetMe = async () => {
        try {
            const response = await getUserApi.me();

            if (response.data.data) {
                setInfo(response.data.data);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                return errorMessage;
            }
            return "Unknown error occurred";
        }
    };
    return { handleGetMe };
}
