export interface PromotionData {
    promoCode: string;
    description: string;
    expiryDate: string;
    price: number;
}

export interface DeliveryFormData {
    firstName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    city: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface CardInfo {
    isValid: boolean;
    error: string | null;
}
