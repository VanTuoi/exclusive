const PUBLIC_API = {
    AUTH_REGISTER: "/users",
    AUTH_LOGIN: "/auth/login",
    AUTH_LOGIN_WITH_GOOGLE: "/auth/login-google",
    AUTH_REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",

    BANNER: "/home/banner",
    NAV_CATEGORIES: "/nav/category",

    CATEGORIES: "/categories",
    PRODUCT_CATEGORIES: "/products/categories",
    PRODUCT_IN_CATEGORIES: "/products/category",
    PRODUCTS: "/products",
    PRODUCT_DETAILS: "/product",

    FLASH_SAFE: "/home/flash-safe",

    PROMOTION: "/cart/promotion",

    SUPPORT_INFO: "/support/info",
    CONTACT_INFO: "/contact/info",
    SUPPORT_SOCIAL: "/support/social"
};

const PROTECTED_API = {
    GET_ME: "auth/me",
    CHANGE_INFO: "auth/me"
};

export const API_URLS = { PROTECTED_API, PUBLIC_API };
