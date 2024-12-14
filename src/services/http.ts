import axios, { AxiosError } from "axios";

import { getLanguageFromClient } from "~/utils/locale";

import applyMockAdapter from "./mocks";

const baseApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": getLanguageFromClient()
    },
    withCredentials: true
});

const baseApiClient = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": getLanguageFromClient()
    }
});

baseApiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

applyMockAdapter(baseApi);
applyMockAdapter(baseApiClient);

export { baseApi, baseApiClient };
