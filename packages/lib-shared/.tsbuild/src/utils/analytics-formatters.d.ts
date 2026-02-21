/**
 * Analytics Formatters
 *
 * Utility functions for formatting analytics data for display.
 * Following KISS and DRY principles.
 */
/**
 * Format a metric change with percentage, unit, and color context
 */
export interface MetricChange {
    value: number;
    percentage: number;
    isPositive: boolean;
    isNegative: boolean;
    trend: 'up' | 'down' | 'neutral';
}
export declare function formatMetricChange(before: number | null | undefined, after: number | null | undefined, metricType?: 'weight' | 'bodyFat' | 'muscleMass' | 'volume' | 'generic'): MetricChange | null;
/**
 * Format duration in seconds to human-readable string
 */
export declare function formatDuration(seconds: number): string;
/**
 * Calculate trend direction from time series data
 */
export declare function calculateTrend(data: number[]): 'up' | 'down' | 'neutral';
/**
 * Format macros for display
 */
export interface Macros {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}
export declare function formatMacros(macros: Macros, compact?: boolean): string;
/**
 * Format percentage
 */
export declare function formatPercentage(value: number, total: number, decimals?: number): string;
/**
 * Format weight with unit
 */
export declare function formatWeight(value: number, unit?: 'kg' | 'lbs', decimals?: number): string;
/**
 * Format number with unit and optional decimals
 */
export declare function formatNumber(value: number, unit?: string, decimals?: number, locale?: string): string;
/**
 * Format date for analytics
 */
export declare function formatAnalyticsDate(date: Date, formatStr?: string): string;
/**
 * Format date range
 */
export declare function formatDateRange(startDate: Date, endDate: Date): string;
/**
 * Format change value with sign
 */
export declare function formatChangeValue(value: number, unit?: string, decimals?: number): string;
/**
 * Get color class for metric value based on context
 */
export declare function getMetricColorClass(value: number, target: number, tolerance?: number): string;
/**
 * Get progress bar color based on percentage
 */
export declare function getProgressBarColor(percentage: number): string;
//# sourceMappingURL=analytics-formatters.d.ts.map