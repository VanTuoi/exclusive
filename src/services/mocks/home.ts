import MockAdapter from "axios-mock-adapter";

import { API_URLS } from "~/constants";

export function home(mock: MockAdapter) {
    mock.onGet(`${API_URLS.PUBLIC_API.SUPPORT_INFO}`).reply(200, {
        success: true,
        message: "Received data successfully",
        data: [
            { title: "Address", value: "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh." },
            { title: "Email", value: "exclusive@gmail.com" },
            { title: "phone", value: "+88015-88888-9999" }
        ]
    });

    mock.onGet(`${API_URLS.PUBLIC_API.CONTACT_INFO}`).reply(200, {
        success: true,
        message: "Get data successfully",
        data: { phone: ["8801611112222"], email: ["customer@exclusive.com", "support@exclusive.com"] }
    });

    mock.onGet(`${API_URLS.PUBLIC_API.SUPPORT_SOCIAL}`).reply(200, {
        success: true,
        message: "Received data successfully",
        data: [
            { title: "Facebook", value: "facebook-link" },
            { title: "Twitter", value: "twitter-link" },
            { title: "Instagram", value: "instagram-link" },
            { title: "Linkedin", value: "linkedin-link" }
        ]
    });

    mock.onGet(`${API_URLS.PUBLIC_API.NAV_CATEGORIES}`).reply(200, {
        success: true,
        message: "Get nav categories data successfully",
        data: [
            {
                name: {
                    en: "Woman's Fashion",
                    vi: "Thời Trang Nữ"
                },
                url: "/womens-fashion"
            },
            {
                name: {
                    en: "Men's Fashion",
                    vi: "Thời Trang Nam"
                },
                url: "/mens-fashion"
            },
            {
                name: {
                    en: "Electronics",
                    vi: "Điện Tử"
                },
                url: "/electronics"
            },
            {
                name: {
                    en: "Home & Lifestyle",
                    vi: "Nhà & Đời Sống"
                },
                url: "/home-lifestyle"
            },
            {
                name: {
                    en: "Medicine",
                    vi: "Y Tế"
                },
                url: "/medicine"
            },
            {
                name: {
                    en: "Sports & Outdoor",
                    vi: "Thể Thao & Ngoài Trời"
                },
                url: "/sports-outdoor"
            },
            {
                name: {
                    en: "Baby's & Toys",
                    vi: "Trẻ Em & Đồ Chơi"
                },
                url: "/babies-toys"
            },
            {
                name: {
                    en: "Groceries & Pets",
                    vi: "Thực Phẩm & Thú Cưng"
                },
                url: "/groceries-pets"
            },
            {
                name: {
                    en: "Health & Beauty",
                    vi: "Sức Khỏe & Sắc Đẹp"
                },
                url: "/health-beauty"
            }
        ]
    });

    mock.onGet(`${API_URLS.PUBLIC_API.BANNER}`).reply(200, {
        success: true,
        message: "Get banner data successfully",
        data: [
            { id: 1, url: "/assets/imgs/banner.webp", alt: "Image 1 Description", link: "/" },
            { id: 1, url: "/assets/imgs/banner.webp", alt: "Image 1 Description", link: "/" },
            { id: 2, url: "/assets/imgs/banner.webp", alt: "Image 2 Description", link: "/" }
        ]
    });

    mock.onGet(`${API_URLS.PUBLIC_API.CATEGORIES}`).reply(200, {
        success: true,
        message: "Get categories successfully",
        data: [
            {
                img: "/assets/icons/categories/cell-phone.svg",
                title: "Phones",
                link: "/cell-phone"
            },
            {
                img: "/assets/icons/categories/computer.svg",
                title: "Computer",
                link: "/computer"
            },
            {
                img: "/assets/icons/categories/smart-watch.svg",
                title: "Smart Watch",
                link: "/smart-watch"
            },
            {
                img: "/assets/icons/categories/camera.svg",
                title: "Camera",
                link: "/camera"
            },
            {
                img: "/assets/icons/categories/head-phones.svg",
                title: "Head Phones",
                link: "/head-phones"
            },
            {
                img: "/assets/icons/categories/gaming.svg",
                title: "Gaming",
                link: "/gaming"
            }
        ]
    });

    mock.onGet(`${API_URLS.PUBLIC_API.FLASH_SAFE}`).reply(() => {
        // const locale: string | undefined = config && config.headers ? config.headers["Accept-Language"] : undefined;
        return [
            200,
            {
                success: true,
                message: "Get product successfully",
                data: [
                    {
                        id: 1,
                        title: "Sony PS5 DualSense Controller",
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
                    },
                    {
                        id: 2,
                        title: "Game console Playstation 5 Pro - PS5",
                        price: 999.99,
                        description:
                            "The PS5 controller offers haptic feedback along with flexible and micro-triggers that put the gaming world at your fingertips.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/May-choi-game-Sony-PS5-Pro.webp",
                                alt: "Game console Playstation 5 Pro - PS5",
                                colorText: "white",
                                colorCode: "#DDDDDD",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Sony-PS5-Pro.webp",
                                alt: "Game console Playstation 5 Pro - PS5",
                                colorText: "white",
                                colorCode: "#DDDDDD",
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
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 899.99
                    },
                    {
                        id: 3,
                        title: "Nintendo Switch OLED – Mod Chip",
                        price: 499.99,
                        description:
                            "Nintendo Switch OLED Hack is a version that has been Modded directly into the hardware of the device to be able to download more games from the 3rd party app store completely free. You can download new applications or games completely online without having to copy the game offline like before.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-OLED-model-NEON-3.webp",
                                alt: "Nintendo Switch OLED",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-Neon.webp",
                                alt: "Nintendo Switch OLED",
                                colorText: "white",
                                colorCode: "#DDDDDD",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Nintendo-Switch-OLED-model-NEON-4.webp",
                                alt: "Nintendo Switch OLED",
                                colorText: "white",
                                colorCode: "#DDDDDD",
                                isIllustration: true
                            }
                        ],
                        rating: {
                            rate: 5 * Math.random(),
                            count: 4.5
                        },
                        isNew: false,
                        promotions: [
                            {
                                type: "percentage",
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 449.99
                    },
                    {
                        id: 4,
                        title: "Lenovo Legion Go 8.8 AMD Ryzen Z1 Extreme",
                        price: 699.99,
                        description:
                            "Lenovo Legion Go 8.8 AMD Ryzen Z1 Extreme 16GB/ 512GB gaming console is the first handheld gaming machine from Lenovo. The machine possesses an extremely powerful configuration from the AMD Ryzen Z1 Extreme chip. Along with that are extremely high-end technologies such as 8.8-inch 144Hz screen, Coldfront cooling technology, ... This promises to be a handheld gaming machine that stirs up the gaming market, in the same segment as ROG Ally, Steam Deck,.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-1.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-2.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-3.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-4.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Lenovo-Legion-Go-8.8-AMD-Ryzen-Z1-Extreme-16GB-512GB-5.webp",
                                alt: "Lenovo Legion Go 8.8",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            }
                        ],
                        rating: {
                            rate: 5 * Math.random(),
                            count: 4.5
                        },
                        isNew: false,
                        promotions: [
                            {
                                type: "percentage",
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 629.99
                    },
                    {
                        id: 5,
                        title: "Sony Playstation VR 2 Virtual Reality Glasses",
                        price: 699.99,
                        description:
                            "Sony Playstation VR 2 virtual reality glasses, also known as SONY PSVR 2, are the next generation of PSVR. Since 2016, when the first version of PSVR glasses was released, until now 2022, Sony has officially announced the next generation with many significant hardware upgrades, with a stylish design like PS5. This is not surprising when PSVR 2 is officially designed for Playstation 5.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2.webp",
                                alt: "Sony Playstation VR 2",
                                colorText: "white",
                                colorCode: "#DDDDDD",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/Kinh-thuc-te-ao-PSVR2-1.webp",
                                alt: "Sony Playstation VR 2",
                                colorText: "white",
                                colorCode: "#DDDDDD",
                                isIllustration: true
                            }
                        ],
                        rating: {
                            rate: 5 * Math.random(),
                            count: 4.5
                        },
                        isNew: false,
                        promotions: [
                            {
                                type: "percentage",
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 629.99
                    },
                    {
                        id: 6,
                        title: "Xbox Series X console (Microsoft)",
                        price: 699.99,
                        description:
                            "The Xbox Series X is one of the most notable products in the world of gaming consoles in recent years. With a combination of powerful performance, advanced design and groundbreaking features, the Xbox Series X promises to bring users an extremely wonderful gaming experience.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-1.webp",
                                alt: "Xbox Series X console",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/may-choi-game-xbox-series-x-2tb.webp",
                                alt: "Xbox Series X console",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-2.webp",
                                alt: "Xbox Series X console",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/May-choi-game-Xbox-Series-X-3.webp",
                                alt: "Xbox Series X console",
                                colorText: "black",
                                colorCode: "black",
                                isIllustration: true
                            }
                        ],
                        rating: {
                            rate: 5 * Math.random(),
                            count: 4.5
                        },
                        isNew: false,
                        promotions: [
                            {
                                type: "percentage",
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 629.99
                    },
                    {
                        id: 7,
                        title: "Xbox Series X/S/One Wireless Controller",
                        price: 699.99,
                        description:
                            "Xbox Series Wireless Controller – Mineral Camo (Special Edition) is the latest controller model from Microsoft. The version with special colors will be an extremely prominent highlight, in addition, with new upgrades, this will be a controller model that many people trust and choose.",
                        category: "Gamings",
                        image: [
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-1.webp",
                                alt: "Xbox Series",
                                colorText: "Arctic Camo",
                                colorCode: "#DDDDDD",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-1.webp",
                                alt: "Xbox Series",
                                colorText: "Daystrike Camo",
                                colorCode: "#BB0000",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-2.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: false
                            },
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-1.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Arctic-camo-2.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-1.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/Tay-cam-xbox-series-X-Daystrike-Camo-2.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-1.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            },
                            {
                                url: "/assets/imgs/products/Tay-Cam-Xbox-Series-Wireless-Controller-Mineral-Camo-Special-Edition-3.webp",
                                alt: "Xbox Series",
                                colorText: "Mineral Camo",
                                colorCode: "#0099FF",
                                isIllustration: true
                            }
                        ],
                        rating: {
                            rate: 5 * Math.random(),
                            count: 4.5
                        },
                        isNew: false,
                        promotions: [
                            {
                                type: "percentage",
                                value: 10,
                                description: "10%"
                            }
                        ],
                        finalPrice: 629.99
                    }
                ]
            }
        ];
    });
}
