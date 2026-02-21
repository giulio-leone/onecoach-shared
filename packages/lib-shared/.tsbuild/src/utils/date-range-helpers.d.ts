/**
 * Date Range Helpers
 *
 * Utility functions for calculating date ranges from periods.
 * Following DRY principle - centralized date range logic for analytics.
 */
export type AnalyticsPeriod = '7d' | '30d' | '90d' | '1y';
export interface DateRange {
    startDate: Date;
    endDate: Date;
}
export type Period = AnalyticsPeriod | 'custom';
/**
 * Calculate date range from period
 *
 * @param period - The time period ('7d', '30d', '90d', '1y', 'custom')
 * @param customRange - Custom date range (required if period is 'custom')
 * @returns Object with startDate and endDate
 */
export declare function getDateRangeFromPeriod(period: Period, customRange?: DateRange): {
    startDate: Date;
    endDate: Date;
};
/**
 * Format date range for display
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted string
 */
export declare function formatDateRange(startDate: Date, endDate: Date): string;
/**
 * Calculate number of days between two dates
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days
 */
export declare function getDaysBetween(startDate: Date, endDate: Date): number;
/**
 * Check if a date is within a date range
 *
 * @param date - Date to check
 * @param startDate - Start date
 * @param endDate - End date
 * @returns True if date is within range
 */
export declare function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean;
/**
 * Get array of dates between start and end
 *
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Array of dates
 */
export declare function getDatesBetween(startDate: Date, endDate: Date): Date[];
/**
 * Get period display label
 *
 * @param period - The period
 * @returns Display label in Italian
 */
export declare function getPeriodLabel(period: Period): string;
//# sourceMappingURL=date-range-helpers.d.ts.map