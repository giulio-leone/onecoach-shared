/**
 * Nutrition Plan Helper Utilities
 *
 * Future-proof utility functions for accessing NutritionPlan data.
 * Centralizes access patterns to avoid schema inconsistencies.
 */
import type { NutritionPlan, NutritionWeek, NutritionDay } from '@onecoach/types';
/**
 * Get all goals from a nutrition plan
 */
export declare function getNutritionPlanGoals(plan: NutritionPlan): string[];
/**
 * Get first goal (for display purposes)
 */
export declare function getNutritionPlanFirstGoal(plan: NutritionPlan): string | null;
/**
 * Get all days from a nutrition plan (flattened from weeks)
 */
export declare function getAllNutritionPlanDays(plan: NutritionPlan): NutritionDay[];
/**
 * Get total number of days in a nutrition plan
 */
export declare function getNutritionPlanTotalDays(plan: NutritionPlan): number;
/**
 * Get a specific day by day number (1-based)
 */
export declare function getNutritionPlanDay(plan: NutritionPlan, dayNumber: number): NutritionDay | null;
/**
 * Get a specific day by week and day number
 */
export declare function getNutritionPlanDayByWeek(plan: NutritionPlan, weekNumber: number, dayNumber: number): NutritionDay | null;
/**
 * Get week by week number
 */
export declare function getNutritionPlanWeek(plan: NutritionPlan, weekNumber: number): NutritionWeek | null;
/**
 * Iterate over all weeks in a plan
 */
export declare function iterateNutritionPlanWeeks(plan: NutritionPlan): Generator<NutritionWeek>;
/**
 * Iterate over all days in a plan (across all weeks)
 */
export declare function iterateNutritionPlanDays(plan: NutritionPlan): Generator<NutritionDay>;
/**
 * Determine week and day number from date
 *
 * Calculates which day of the nutrition plan should be displayed based on the target date.
 * The plan cycles through all days, repeating from the beginning when the cycle completes.
 *
 * @param plan - The nutrition plan
 * @param targetDate - The target date to calculate the day for
 * @returns Object with weekNumber and dayNumber, or null if plan has no weeks
 */
export declare function getWeekAndDayFromDate(plan: NutritionPlan, targetDate: Date): {
    weekNumber: number;
    dayNumber: number;
} | null;
//# sourceMappingURL=nutrition-plan-helpers.d.ts.map