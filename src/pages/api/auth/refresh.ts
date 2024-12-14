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
        req.on("end", async () => {
            try {
                const accessToken = req.cookies["accessToken"];

                if (!accessToken) {
                    return handleApiResponse(res, 401, "Access token missing", false, null);
                }
                const getAuthApi = authApi("server");

                const response = await getAuthApi.refreshToken(accessToken);

                if (response) {
                    console.log("successfully");
                }
                // const { accessToken: newAccessToken, refreshToken, expiredAt } = response.data;

                // if (!newAccessToken || !refreshToken || !expiredAt) {
                //     return handleApiResponse(res, 500, "Missing tokens", false, null);
                // }

                // res.setHeader("Set-Cookie", [
                //     `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=${expiredAt}`,
                //     `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${expiredAt * 2}`
                // ]);

                const newAccessToken =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ";

                res.setHeader("Set-Cookie", [`accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=${3600}`]);

                return handleApiResponse(res, 200, "Token refreshed successfully", true, null);
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
