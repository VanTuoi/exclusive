/**
 * Get category from URL
 * @param path - URL path
 * @returns Decoded category
 */
export function getCategoryFromPath(path: string): string {
    const match = path.match(/\/([^\/]+)\//);
    return match ? decodeURIComponent(match[1]).replace(/-/g, " ") : "";
}

/**
 *
 * @param path url to get id
 * @returns id product
 */
export function getIdFromPath(path: string): string {
    const match = path.match(/\/(\d+)(\/|$)/);
    return match ? match[0] : "";
}

/**
 * Create a URL string from category, id and name.
 * @param category - Product category.
 * @param id - Product ID.
 * @param name - Product name.
 * @returns- URL string created in /category/id/name format, with name encoded for URL-friendliness.
 */
export function createUrl(category: string, id: number, name: string): string {
    // Encode the name to make it URL-friendly
    const encodedName = encodeURIComponent(name);
    return `/${category}/${id}/${encodedName}`;
}
