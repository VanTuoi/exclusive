import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import { homeApi, productApi } from "~/services";
import { Category, CategoryNav, ImageBanner, Product } from "~/types";

import { useCustomSnackbar } from "../use-toast";

interface DataSupport {
    title: string;
    value: string;
}

interface DataSocial {
    title: string;
    value: string;
}

export function useHome() {
    const { showSnackbar } = useCustomSnackbar();

    const getHomeApi = homeApi("client");
    const getProductApi = productApi("client");

    const [dataFlashSafe, setDataFlashSafe] = useState<Product[]>([]);
    const [dataCategories, setDataCategories] = useState<Category[]>([]);
    const [dataSupport, setDataSupport] = useState<[DataSupport] | []>([]);
    const [dataSocial, setDataSocial] = useState<[DataSocial] | []>([]);
    const [dataNavCategories, setDataNavCategories] = useState<[CategoryNav] | []>([]);
    const [dataBanner, setDataBanner] = useState<[ImageBanner] | []>([]);

    useEffect(() => {
        handleGetSupportInfo();
        handleGetSupportSocial();
        handleGetNavCategories();
        handleGetBanner();
        handleGetCategories();
        handleGetFlashSafe();
    }, []);

    const handleGetSupportInfo = async () => {
        try {
            const response = await getHomeApi.getAllSupportInfo();

            setDataSupport(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetSupportSocial = async () => {
        try {
            const response = await getHomeApi.getAllSupportSocial();

            setDataSocial(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetNavCategories = async () => {
        try {
            const response = await getProductApi.getNavCategories();

            setDataNavCategories(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetProductCategories = async () => {
        try {
            const response = await getProductApi.getProductCategories();

            setDataCategories(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetCategories = async () => {
        try {
            const response = await getProductApi.getCategories();

            setDataCategories(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetBanner = async () => {
        try {
            const response = await getHomeApi.getBanner();

            setDataBanner(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    const handleGetFlashSafe = async () => {
        try {
            const response = await getHomeApi.getFlashSafe();

            setDataFlashSafe(response.data.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message;
                showSnackbar(errorMessage, "error");
            }
            showSnackbar("Unknown error occurred", "error");
        }
    };

    return {
        handleGetSupportInfo,
        handleGetSupportSocial,
        handleGetNavCategories,
        handleGetProductCategories,
        dataSocial,
        dataSupport,
        dataNavCategories,
        dataCategories,
        dataBanner,
        dataFlashSafe
    };
}
