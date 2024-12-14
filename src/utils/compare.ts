/**
 *
 * @param timeUpdate Time to compare
 * @param minutes Minutes from present
 * @returns Is there a time before the present with minutes?
 */
export function isOlderThanMinutes(timeUpdate: Date | null, minutes: number): boolean {
    if (!timeUpdate) return true;

    const now = new Date();
    const timeThreshold = new Date(now.getTime() - minutes * 60 * 1000);

    return timeUpdate < timeThreshold;
}
