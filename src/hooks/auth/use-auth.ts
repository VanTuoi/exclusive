import { useRouter } from "next/router";

import { AxiosError } from "axios";

import { authApi } from "~/services";
import { useAuthStore } from "~/stores";
import { UserDataRegister } from "~/types";

import { useCustomSnackbar } from "../use-toast";

export function useAuth() {
    const { setInfo } = useAuthStore();

    const { showSnackbar } = useCustomSnackbar();

    const router = useRouter();
    const { urlCallBack } = router.query;

    const getAuthApi = authApi("client");
    const getAuthApiServer = authApi("server");

    const handleLogin = async (emailAddress: string, currentPassword: string) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            await getAuthApi.login({ emailAddress, currentPassword });

            localStorage.setItem("isLogin", "true");

            showSnackbar("Login successful", "success");

            if (urlCallBack && typeof urlCallBack === "string") {
                router.push(urlCallBack);
            } else {
                router.push("/");
            }

            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                return errorMessage;
            }
            return "Unknown error occurred";
        }
    };

    const handleLoginWithGoogle = async (accessToken: string) => {
        try {
            await getAuthApi.loginWithGoogle(accessToken);

            localStorage.setItem("isLogin", "true");

            showSnackbar("Login with Google successful", "success");

            if (urlCallBack && typeof urlCallBack === "string") {
                router.push(urlCallBack);
            } else {
                router.push("/");
            }

            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                return errorMessage;
            }
            return "Unknown error occurred";
        }
    };

    const handleRegister = async (userData: UserDataRegister) => {
        try {
            await getAuthApiServer.register(userData);

            router.push("/auth/login");

            showSnackbar("Registration successful", "success");

            return null;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;

                return errorMessage;
            }
            return "Unknown error occurred";
        }
    };

    const handleLogout = async () => {
        try {
            await getAuthApi.logout();

            setInfo(null);

            localStorage.removeItem("isLogin");

            showSnackbar("Logout successful", "success");

            router.push("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    return { handleLogin, handleLoginWithGoogle, handleRegister, handleLogout };
}
