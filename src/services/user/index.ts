import { ResponseData, UpdateUserData, UserData } from "~/types";

import { API_URLS } from "~/constants/api";

import { getApi } from "~/utils/api-selector";

export const userApi = (type: "server" | "client" = "client") => {
    const api = getApi(type);

    return {
        getMe: (id: string) => {
            return api.get<ResponseData<UserData>>(`${API_URLS.PROTECTED_API.GET_ME}/${id}`);
        },
        changeInfo: (userData: UpdateUserData) => {
            return api.patch<ResponseData<UserData>>(`${API_URLS.PROTECTED_API.CHANGE_INFO}`, userData);
        }
    };
};
