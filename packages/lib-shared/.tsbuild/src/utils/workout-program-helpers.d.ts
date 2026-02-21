/**
 * Workout Program Helper Utilities
 *
 * Future-proof utility functions for accessing WorkoutProgram data.
 * Centralizes access patterns to avoid schema inconsistencies.
 * Mirrors the structure of nutrition-plan-helpers.ts for consistency.
 */
import type { WorkoutProgram, WorkoutWeek, WorkoutDay } from '@onecoach/types';
/**
 * Get all goals from a workout program
 */
export declare function getWorkoutProgramGoals(program: WorkoutProgram): string[];
/**
 * Get first goal (for display purposes)
 */
export declare function getWorkoutProgramFirstGoal(program: WorkoutProgram): string | null;
/**
 * Get all days from a workout program (flattened from weeks)
 */
export declare function getAllWorkoutProgramDays(program: WorkoutProgram): WorkoutDay[];
/**
 * Get total number of days in a workout program
 */
export declare function getWorkoutProgramTotalDays(program: WorkoutProgram): number;
/**
 * Get a specific day by day number (1-based)
 */
export declare function getWorkoutProgramDay(program: WorkoutProgram, dayNumber: number): WorkoutDay | null;
/**
 * Get a specific day by week and day number
 */
export declare function getWorkoutProgramDayByWeek(program: WorkoutProgram, weekNumber: number, dayNumber: number): WorkoutDay | null;
/**
 * Get week by week number
 */
export declare function getWorkoutProgramWeek(program: WorkoutProgram, weekNumber: number): WorkoutWeek | null;
/**
 * Iterate over all weeks in a program
 */
export declare function iterateWorkoutProgramWeeks(program: WorkoutProgram): Generator<WorkoutWeek>;
/**
 * Iterate over all days in a program (across all weeks)
 */
export declare function iterateWorkoutProgramDays(program: WorkoutProgram): Generator<WorkoutDay>;
/**
 * Determine week and day number from date
 *
 * Calculates which day of the workout program should be displayed based on the target date.
 * The program cycles through all days, repeating from the beginning when the cycle completes.
 *
 * @param program - The workout program
 * @param targetDate - The target date to calculate the day for
 * @returns Object with weekNumber and dayNumber, or null if program has no weeks
 */
export declare function getWeekAndDayFromDate(program: WorkoutProgram, targetDate: Date): {
    weekNumber: number;
    dayNumber: number;
} | null;
//# sourceMappingURL=workout-program-helpers.d.ts.map