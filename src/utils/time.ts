/**
 *
 * @param n day
 * @returns ISO String date with n day
 */
export const getDatePlusNDays = (n: number) => {
    const date = new Date();
    date.setDate(date.getDate() + n);
    return date.toISOString();
};
