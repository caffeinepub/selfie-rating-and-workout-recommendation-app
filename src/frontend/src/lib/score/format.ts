/**
 * Safely formats a rating number for display, handling edge cases like NaN, Infinity, and undefined.
 * @param rating - The rating value to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted rating string
 */
export function formatRating(rating: number | undefined | null, decimals: number = 1): string {
  if (rating === undefined || rating === null || isNaN(rating) || !isFinite(rating)) {
    return '0.0';
  }
  return rating.toFixed(decimals);
}

/**
 * Safely converts a rating to a number, handling edge cases.
 * @param rating - The rating value to convert
 * @returns Safe number value (0 if invalid)
 */
export function safeRating(rating: number | undefined | null): number {
  if (rating === undefined || rating === null || isNaN(rating) || !isFinite(rating)) {
    return 0;
  }
  return rating;
}
