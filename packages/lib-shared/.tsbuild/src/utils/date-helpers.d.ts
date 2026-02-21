/**
 * Date Helper Utilities
 *
 * Centralized date manipulation and formatting functions.
 * Future-proof alternative to date-fns usage.
 */
/**
 * Add days to a date
 */
export declare function addDays(date: Date, days: number): Date;
/**
 * Subtract days from a date
 */
export declare function subtractDays(date: Date, days: number): Date;
/**
 * Get start of day (00:00:00)
 */
export declare function startOfDay(date: Date): Date;
/**
 * Get end of day (23:59:59)
 */
export declare function endOfDay(date: Date): Date;
/**
 * Check if two dates are on the same day
 */
export declare function isSameDay(date1: Date, date2: Date): boolean;
/**
 * Format date to YYYY-MM-DD (ISO date format)
 */
export declare function formatISODate(date: Date): string;
/**
 * Parse ISO date string (YYYY-MM-DD) to Date
 */
export declare function parseISODate(isoString: string): Date;
/**
 * Get date range for a period string
 */
export declare function getDateRangeFromPeriod(period: string): {
    startDate: Date;
    endDate: Date;
};
/**
 * Get number of days between two dates
 */
export declare function getDaysDifference(date1: Date, date2: Date): number;
//# sourceMappingURL=date-helpers.d.ts.map