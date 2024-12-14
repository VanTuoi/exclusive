import { DataContact, ResponseData } from "~/types";

import { API_URLS } from "~/constants/api";

import { ImageBanner, Product } from "~/types/product";

import { getApi } from "~/utils/api-selector";

export const homeApi = (type: "server" | "client" = "client") => {
    const api = getApi(type);

    return {
        getAllSupportInfo: () => {
            return api.get<ResponseData<[]>>(API_URLS.PUBLIC_API.SUPPORT_INFO);
        },
        getAllSupportSocial: () => {
            return api.get<ResponseData<[]>>(API_URLS.PUBLIC_API.SUPPORT_SOCIAL);
        },
        getAllContactInfo: () => {
            return api.get<ResponseData<DataContact>>(API_URLS.PUBLIC_API.CONTACT_INFO);
        },
        getBanner: () => {
            return api.get<ResponseData<[ImageBanner]>>(API_URLS.PUBLIC_API.BANNER);
        },
        getFlashSafe: () => {
            return api.get<ResponseData<[Product]>>(API_URLS.PUBLIC_API.FLASH_SAFE);
        }
    };
};
