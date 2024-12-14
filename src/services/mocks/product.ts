import MockAdapter from "axios-mock-adapter";

import { API_URLS } from "~/constants";

export function product(mock: MockAdapter) {
    mock.onGet(new RegExp(`${API_URLS.PUBLIC_API.PRODUCT_DETAILS}/\\d+$`)).reply((config) => {
        const match = config.url?.match(/\/(\d+)$/);
        const id = match ? parseInt(match[1], 10) : null;

        if (!id) {
            return [404, { success: false, message: "Product not found" }];
        }

        return [
            200,
            {
                success: true,
                message: "Get product details successfully",
                data: {
                    id: id,
                    title: "Sony PS5 DualSense Controller",
                    sizes: [],
                    price: 49.99,
                    description:
                        "The PS5 controller offers haptic feedback along with flexible and micro-triggers that put the gaming world at your fingertips.",
                    category: "Gamings",
                    image: [
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "white",
                            colorCode: "#DDDDDD",
                            isIllustration: false
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Den.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "black",
                            colorCode: "black",
                            isIllustration: false
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Xanh.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "Blue",
                            colorCode: "#00CCFF",
                            isIllustration: false
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "red",
                            colorCode: "#CC0066",
                            isIllustration: false
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do-2.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "",
                            colorCode: "",
                            isIllustration: true
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-2.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "",
                            colorCode: "",
                            isIllustration: true
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-3.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "",
                            colorCode: "",
                            isIllustration: true
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-4.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "",
                            colorCode: "",
                            isIllustration: true
                        },
                        {
                            url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-5.webp",
                            alt: "Sony PS5 DualSense Controller",
                            colorText: "",
                            colorCode: "",
                            isIllustration: true
                        }
                    ],
                    rating: {
                        rate: 2.5 * Math.random() + 2.5 * Math.random(),
                        count: id
                    },
                    isNew: true,
                    promotions: [
                        {
                            type: "percentage",
                            value: 25,
                            description: "25%"
                        }
                    ],
                    finalPrice: 37
                }
            }
        ];
    });

    mock.onGet(`${API_URLS.PUBLIC_API.PRODUCTS}`).reply(200, {
        success: true,
        message: "Get product successfully",
        data: [
            {
                id: 1,
                title: "Sony PS5 DualSense Controller",
                sizes: ["M", "L"],
                price: 49.99,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                category: "Gamings",
                image: [
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "white",
                        colorCode: "#DDDDDD",
                        isIllustration: false
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Den.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "black",
                        colorCode: "black",
                        isIllustration: false
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Xanh.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "Blue",
                        colorCode: "#00CCFF",
                        isIllustration: false
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "red",
                        colorCode: "#CC0066",
                        isIllustration: false
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Do-2.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "",
                        colorCode: "",
                        isIllustration: true
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-2.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "",
                        colorCode: "",
                        isIllustration: true
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-3.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "",
                        colorCode: "",
                        isIllustration: true
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-4.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "",
                        colorCode: "",
                        isIllustration: true
                    },
                    {
                        url: "/assets/imgs/products/Playstation-5-Tay-cam-PS5-Trang-5.webp",
                        alt: "Sony PS5 DualSense Controller",
                        colorText: "",
                        colorCode: "",
                        isIllustration: true
                    }
                ],
                rating: {
                    rate: 5 * Math.random(),
                    count: 4.5
                },
                isNew: true,
                promotions: [
                    {
                        type: "percentage",
                        value: 25,
                        description: "25%"
                    }
                ],
                finalPrice: 37
            }
        ]
    });
}
