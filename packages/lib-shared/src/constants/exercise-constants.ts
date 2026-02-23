/**
 * Exercise Constants
 *
 * Domain-specific constants for exercise generation and management.
 * Moved from lib-ai-agents for centralization.
 */

/**
 * Exercise Generation Limits
 */
export const EXERCISE_CONSTANTS = {
  /** Minimum number of exercises to generate */
  MIN_EXERCISE_COUNT: 1,
  /** Maximum number of exercises to generate */
  MAX_EXERCISE_COUNT: 20,
  /** Maximum number of variants to create */
  MAX_VARIANTS: 10,
  /** Default batch size for exercise operations */
  DEFAULT_BATCH_SIZE: 10,
} as const;

export type ExerciseConstantsType = typeof EXERCISE_CONSTANTS;
