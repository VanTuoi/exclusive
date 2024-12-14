/**
 *
 * @returns Locale
 */
export const getLanguageFromClient = (): string => {
    if (typeof window !== "undefined") {
        const language = document.cookie
            .split("; ")
            .find((row) => row.startsWith("NEXT_LOCALE="))
            ?.split("=")[1];
        return language || "en";
    }
    return "en";
};
