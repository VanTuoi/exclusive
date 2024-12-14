import { ResponseData } from "~/types";

import { API_URLS } from "~/constants/api";

import { Category, CategoryNav, Product } from "~/types/product";

import { getApi } from "~/utils/api-selector";
import { arrayToQueryString } from "~/utils/query";

export const productApi = (type: "server" | "client" = "client") => {
    const api = getApi(type);

    return {
        getAllProducts: (entries: [string, string | number][]) => {
            return api.get<ResponseData<[Product]>>(API_URLS.PUBLIC_API.PRODUCTS + arrayToQueryString(entries));
        },
        getProductDetails: (id: string) => {
            return api.get<ResponseData<Product>>(API_URLS.PUBLIC_API.PRODUCT_DETAILS + `/${id}`);
        },
        getProductCategories: () => {
            return api.get<ResponseData<[]>>(API_URLS.PUBLIC_API.PRODUCT_CATEGORIES);
        },
        getProductInCategories: (category: string, entries: [string, string | number][]) => {
            return api.get<ResponseData<[]>>(
                API_URLS.PUBLIC_API.PRODUCT_IN_CATEGORIES + `/${category}` + arrayToQueryString(entries)
            );
        },
        getNavCategories: () => {
            return api.get<ResponseData<[CategoryNav]>>(API_URLS.PUBLIC_API.NAV_CATEGORIES);
        },
        getCategories: () => {
            return api.get<ResponseData<[Category]>>(API_URLS.PUBLIC_API.CATEGORIES);
        }
    };
};
