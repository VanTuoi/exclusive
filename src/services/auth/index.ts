import { LoginData, RefreshTokenData, ResponseData, UserData } from "~/types";

import { API_URLS } from "~/constants/api";

import { getApi } from "~/utils/api-selector";

export const authApi = (type: "server" | "client" = "client") => {
    const api = getApi(type);

    return {
        login: (user: Partial<UserData>) => {
            return api.post<ResponseData<LoginData>>(API_URLS.PUBLIC_API.AUTH_LOGIN, user);
        },
        loginWithGoogle: (token: string) => {
            return api.post<ResponseData<LoginData>>(API_URLS.PUBLIC_API.AUTH_LOGIN_WITH_GOOGLE, token);
        },
        me: () => {
            return api.post<ResponseData<UserData>>(API_URLS.PROTECTED_API.GET_ME);
        },
        register: (user: Partial<UserData>) => {
            return api.post<ResponseData<UserData>>(API_URLS.PUBLIC_API.AUTH_REGISTER, user);
        },
        refreshToken: (refresh: string) => {
            return api.post<ResponseData<RefreshTokenData>>(API_URLS.PUBLIC_API.AUTH_REFRESH, {
                refreshToken: refresh
            });
        },
        logout: () => {
            return api.post<ResponseData<null>>(API_URLS.PUBLIC_API.LOGOUT);
        }
    };
};
