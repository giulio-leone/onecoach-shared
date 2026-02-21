/**
 * Date Conversion Utilities
 *
 * Clean utilities for handling Date/string conversions between
 * Prisma entities and domain types following SOLID principles.
 */
/**
 * Converts Date to ISO string for domain types
 *
 * @param date - Date object or null/undefined
 * @returns ISO string or null
 */
export declare function dateToString(date: Date | null | undefined): string | null;
/**
 * Converts ISO string to Date for Prisma operations
 *
 * @param dateString - ISO string or null/undefined
 * @returns Date object or null
 */
export declare function stringToDate(dateString: string | null | undefined): Date | null;
/**
 * Ensures a value is a Date object
 *
 * @param value - Date, string, or null/undefined
 * @returns Date object or null
 */
export declare function ensureDate(value: Date | string | null | undefined): Date | null;
/**
 * Converts array of dates to strings
 *
 * @param dates - Array of Date objects
 * @returns Array of ISO strings
 */
export declare function datesToStrings(dates: (Date | null)[]): (string | null)[];
/**
 * Converts array of strings to dates
 *
 * @param strings - Array of ISO strings
 * @returns Array of Date objects
 */
export declare function stringsToDates(strings: (string | null)[]): (Date | null)[];
//# sourceMappingURL=date-conversion.d.ts.map