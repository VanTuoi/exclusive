export interface LoginData {
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
}

export interface LoginWithGoogleData {
    accessToken: string;
}

export interface RefreshTokenData {
    accessToken?: string;
    expiredAt?: number;
}
