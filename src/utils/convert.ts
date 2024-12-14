/**
 * Function to remove square brackets [] in the string
 * @param str - Input string
 * @returns String with square brackets [] removed
 */

export function removeBrackets(str: string): string {
    return str.replace(/\[|\]/g, "");
}

/**
 * Function to convert a number to currency format based on locale
 * @param num - Input number
 * @param locale - Locale for formatting
 * @returns Currency format string
 */
export function formatCurrency(num: number | undefined, locale: string): string {
    const localeCurrencyMap: Record<string, string> = {
        en: "USD",
        vi: "VND",
        fr: "EUR",
        de: "EUR",
        ja: "JPY"
    };
    const currency = localeCurrencyMap[locale] || "USD";
    const value = num ?? 0;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    }).format(value);
}

/**
 * Split the description string into lines based on both '/' and ';' characters
 * @param description - The input description string
 * @returns An array of strings with extra whitespace removed
 */
export function splitDescription(description: string): string[] {
    return description.split(/[\/;]+/).map((line) => line.trim());
}

/**
 *
 * @param formatTime
 * @returns
 */
export function formatTimeToArray(formatTime: string): number[] {
    const parsedTime = new Date(formatTime);
    const currentTime = new Date();

    const diffInMs = parsedTime.getTime() - currentTime.getTime();

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
}
