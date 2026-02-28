/**
 * Nutrition Plan Helper Utilities
 *
 * Future-proof utility functions for accessing NutritionPlan data.
 * Centralizes access patterns to avoid schema inconsistencies.
 */

import type { NutritionPlan, NutritionWeek, NutritionDay } from '@giulio-leone/types';

/**
 * Get all goals from a nutrition plan
 */
export function getNutritionPlanGoals(plan: NutritionPlan): string[] {
  return plan.goals || [];
}

/**
 * Get first goal (for display purposes)
 */
export function getNutritionPlanFirstGoal(plan: NutritionPlan): string | null {
  return plan.goals && plan.goals.length > 0 ? (plan.goals[0] ?? null) : null;
}

/**
 * Get all days from a nutrition plan (flattened from weeks)
 */
export function getAllNutritionPlanDays(plan: NutritionPlan): NutritionDay[] {
  if (!plan.weeks || plan.weeks.length === 0) {
    return [];
  }
  return plan.weeks.flatMap((week) => week.days || []);
}

/**
 * Get total number of days in a nutrition plan
 */
export function getNutritionPlanTotalDays(plan: NutritionPlan): number {
  return getAllNutritionPlanDays(plan).length;
}

/**
 * Get a specific day by day number (1-based)
 */
export function getNutritionPlanDay(plan: NutritionPlan, dayNumber: number): NutritionDay | null {
  const days = getAllNutritionPlanDays(plan);
  return days.find((d: any) => d.dayNumber === dayNumber) || null;
}

/**
 * Get a specific day by week and day number
 */
export function getNutritionPlanDayByWeek(
  plan: NutritionPlan,
  weekNumber: number,
  dayNumber: number
): NutritionDay | null {
  const week = plan.weeks?.find((w: any) => w.weekNumber === weekNumber);
  if (!week) {
    return null;
  }
  return week.days?.find((d: any) => d.dayNumber === dayNumber) || null;
}

/**
 * Get week by week number
 */
export function getNutritionPlanWeek(
  plan: NutritionPlan,
  weekNumber: number
): NutritionWeek | null {
  return plan.weeks?.find((w: any) => w.weekNumber === weekNumber) || null;
}

/**
 * Iterate over all weeks in a plan
 */
export function* iterateNutritionPlanWeeks(plan: NutritionPlan): Generator<NutritionWeek> {
  if (!plan.weeks) {
    return;
  }
  for (const week of plan.weeks) {
    yield week;
  }
}

/**
 * Iterate over all days in a plan (across all weeks)
 */
export function* iterateNutritionPlanDays(plan: NutritionPlan): Generator<NutritionDay> {
  if (!plan.weeks) {
    return;
  }
  for (const week of plan.weeks) {
    if (week.days) {
      for (const day of week.days) {
        yield day;
      }
    }
  }
}

import { getWeekAndDayFromDate as getWeekAndDayFromDateGeneric } from './plan-helpers';

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
export function getWeekAndDayFromDate(
  plan: NutritionPlan,
  targetDate: Date
): { weekNumber: number; dayNumber: number } | null {
  return getWeekAndDayFromDateGeneric(plan, targetDate);
}
