import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

import { baseApiClient } from "~/services/http";

export const config = {
    api: {
        externalResolver: true,
        bodyParser: false
    }
};

const proxy = createProxyMiddleware({
    target: process.env.NEXT_PUBLIC_BACKEND_URL,
    changeOrigin: true,
    selfHandleResponse: false,
    pathRewrite: { "^/api": "" },
    secure: false
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const accessToken: string | undefined = req.cookies["accessToken"];

    const url = req.url || "";
    const pathname = url.split("?")[0];

    const paths = ["/user", "/auth"];

    if (paths.some((path) => pathname.startsWith(path)) && accessToken) {
        req.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    req.headers.cookie = "";

    const useMockApi = process.env.USE_MOCK_API === "true";

    if (useMockApi) {
        baseApiClient({
            method: req.method,
            url: pathname,
            headers: {
                ...req.headers,
                "Content-Type": "application/json"
            },
            data: req.body
        })
            .then((response) => {
                res.status(response.status).json(response.data);
            })
            .catch((error) => {
                res.status(error.response?.status || 500).json({ message: error.message });
            });
    } else {
        return proxy(req, res);
    }
}
