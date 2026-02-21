/**
 * Generic Plan Helpers
 *
 * Shared utilities for plans with weeks and days structure (NutritionPlan, WorkoutProgram)
 * Following DRY and SOLID principles
 */
/**
 * Common interface for plans with weeks structure
 */
export interface PlanWithWeeks {
    weeks?: Array<{
        weekNumber: number;
        days?: Array<{
            dayNumber: number;
        }>;
    }>;
    createdAt?: string | Date;
}
/**
 * Determine week and day number from date (generic implementation)
 *
 * Calculates which day of the plan should be displayed based on the target date.
 * The plan cycles through all days, repeating from the beginning when the cycle completes.
 *
 * @param plan - The plan with weeks structure
 * @param targetDate - The target date to calculate the day for
 * @returns Object with weekNumber and dayNumber, or null if plan has no weeks
 */
export declare function getWeekAndDayFromDate<T extends PlanWithWeeks>(plan: T, targetDate: Date): {
    weekNumber: number;
    dayNumber: number;
} | null;
//# sourceMappingURL=plan-helpers.d.ts.map