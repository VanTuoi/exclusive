import { isAxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { authApi } from "~/services";
import { ResponseData } from "~/types";
import { handleApiResponse } from "~/utils";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData<null>>) {
    if (req.method !== "POST") {
        return handleApiResponse(res, 405, "Method not allowed", false, null);
    }

    return new Promise<void>((resolve) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const { accessToken: accessTokenOfGoogle } = JSON.parse(body);
                const getAuthApi = authApi("server");

                const response = await getAuthApi.loginWithGoogle(accessTokenOfGoogle);

                const { accessToken, refreshToken, expiredAt } = response.data.data;

                if (!accessToken || !refreshToken || !expiredAt) {
                    return handleApiResponse(res, 500, "Missing tokens", false, null);
                }

                res.setHeader("Set-Cookie", [
                    `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${expiredAt}`,
                    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${expiredAt * 2}`
                ]);

                handleApiResponse(res, 200, "Login successful", true, null);
            } catch (error) {
                if (isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message || "An unexpected error occurred";
                    const statusCode = error.response?.status || 500;
                    return handleApiResponse(res, statusCode, errorMessage, false, null);
                }
                return handleApiResponse(res, 500, "Internal server error", false, null);
            } finally {
                resolve();
            }
        });

        req.on("error", () => {
            handleApiResponse(res, 500, "Internal server error", false, null);
            resolve();
        });
    });
}
