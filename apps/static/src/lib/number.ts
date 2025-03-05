/**
 * Formats a number as '1k', '1M', or '1B' if it's greater than 1000, 1 million, or 1 billion respectively.
 * @param num - The number to be formatted.
 * @returns The formatted string representation of the number.
 */
export const formatNumberToReadable = (number: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
    })

    const billion = 1e9
    const million = 1e6
    const thousand = 1e3
    if (number >= billion) {
        return formatter.format(number / billion) + 'B'
    } else if (number >= million) {
        return formatter.format(number / million) + 'M'
    } else if (number >= thousand) {
        return formatter.format(number / thousand) + 'k'
    } else {
        return formatter.format(number)
    }
}

/**
 * Function to calculate the percentage of a current number relative to a total number.
 * @param total - The total number.
 * @param current - The current number.
 * @returns The calculated percentage.
 */
export function calculatePercentage(total: number, current: number): number {
    if (total === 0) {
        return 0
    }

    // Calculate the percentage and round it to two decimal places.
    const percentage = (current / total) * 100
    return Math.round(percentage * 100) / 100
}
