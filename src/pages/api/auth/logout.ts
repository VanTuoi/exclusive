import { NextApiRequest, NextApiResponse } from "next";

import { handleApiResponse } from "~/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return handleApiResponse(res, 405, "Method not allowed", false, null);
    }
    try {
        res.setHeader("Set-Cookie", [
            "accessToken=; HttpOnly; Path=/; Max-Age=0;",
            "refreshToken=; HttpOnly; Path=/; Max-Age=0;"
        ]);
        return handleApiResponse(res, 200, "Logged out successfully", false, null);
    } catch (error) {
        console.error("Error during login:", error);
        return handleApiResponse(res, 500, "Internal server error", false, null);
    }
}
