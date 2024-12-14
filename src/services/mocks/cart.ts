import MockAdapter from "axios-mock-adapter";

import { API_URLS } from "~/constants";

export function cart(mock: MockAdapter) {
    mock.onPost(`${API_URLS.PUBLIC_API.PROMOTION}`).reply((config) => {
        const { promotionCode } = JSON.parse(config.data);

        if (promotionCode === "DISCOUNT20") {
            return [
                200,
                {
                    success: true,
                    message: "Promotion applied successfully",
                    data: {
                        promoCode: promotionCode,
                        description: "Get 20% off on your next purchase.",
                        expiryDate: "2024-12-31",
                        price: 50.0
                    }
                }
            ];
        }
        if (promotionCode === "DISCOUNT21") {
            return [
                200,
                {
                    success: true,
                    message: "Promotion applied successfully",
                    data: {
                        promoCode: promotionCode,
                        description: "Get 20% off on your next purchase.",
                        expiryDate: "2024-12-31",
                        price: 70.0
                    }
                }
            ];
        }
        if (promotionCode === "DISCOUNT22") {
            return [
                200,
                {
                    success: true,
                    message: "Promotion applied successfully",
                    data: {
                        promoCode: promotionCode,
                        description: "Get 20% off on your next purchase.",
                        expiryDate: "2024-12-31",
                        price: 80.0
                    }
                }
            ];
        }

        return [
            404,
            {
                success: false,
                message: "Promotion code not found",
                data: {
                    message: "Promotional code does not exist"
                }
            }
        ];
    });
}
