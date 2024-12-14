import { baseApi, baseApiClient } from "~/services/http";

/**
 * @param type client is api used in next, server is backend api
 * @returns
 */
export function getApi(type: "server" | "client" = "client") {
    return type === "client" ? baseApiClient : baseApi;
}
