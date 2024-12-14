/**
 * Converts an array of key-value pairs to a query string
 * @param entries - An array of key-value pairs
 * @returns A query string
 */
export function arrayToQueryString(entries: [string, string | number][]): string {
    if (entries.length > 0) {
        return "?" + entries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
    } else return "";
}
