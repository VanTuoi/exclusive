import { NextApiResponse } from "next";

import { ResponseData } from "~/types";

/**
 * Utility function to handle API response.
 * @param res NextApiResponse
 * @param statusCode HTTP status code
 * @param message Response message
 * @param success Status of the result (true/false)
 * @param data Returned data (if any)
 */

export function handleApiResponse<T>(
    res: NextApiResponse<ResponseData<T>>,
    statusCode: number,
    message: string,
    success: boolean,
    data: T
) {
    return res.status(statusCode).json({
        data,
        statusCode,
        message,
        success
    });
}
