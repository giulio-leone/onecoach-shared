/**
 * Platform-agnostic Drag and Drop Helper Utilities
 *
 * These pure functions handle array reordering and moving items between lists.
 * They are completely independent of any drag and drop library and can be
 * used in both web (React) and mobile (React Native) contexts.
 */
import type { ReorderOperation, ReorderResult, MoveOperation, MoveResult } from '@onecoach/types';
/**
 * Reorder items within the same array (immutable)
 *
 * @example
 * reorderArray({ items: [1, 2, 3], sourceIndex: 0, destinationIndex: 2 })
 * // Returns: { items: [2, 3, 1] }
 */
export declare function reorderArray<T>(operation: ReorderOperation<T>): ReorderResult<T>;
/**
 * Move an item from one array to another (immutable)
 *
 * @example
 * moveItemBetweenArrays({
 *   sourceList: [1, 2, 3],
 *   destinationList: [4, 5],
 *   sourceIndex: 0,
 *   destinationIndex: 1
 * })
 * // Returns: {
 * //   sourceList: [2, 3],
 * //   destinationList: [4, 1, 5],
 * //   movedItem: 1
 * // }
 */
export declare function moveItemBetweenArrays<T>(operation: MoveOperation<T>): MoveResult<T>;
/**
 * Create a unique drag ID for a food item
 */
export declare function createFoodDragId(dayNumber: number, mealId: string, foodId: string): string;
/**
 * Parse a food drag ID
 */
export declare function parseFoodDragId(dragId: string): {
    dayNumber: number;
    mealId: string;
    foodId: string;
} | null;
/**
 * Create a unique drag ID for a meal
 */
export declare function createMealDragId(dayNumber: number, mealId: string): string;
/**
 * Parse a meal drag ID
 */
export declare function parseMealDragId(dragId: string): {
    dayNumber: number;
    mealId: string;
} | null;
/**
 * Create a unique drag ID for a nutrition day
 */
export declare function createNutritionDayDragId(weekNumber: number, dayNumber: number): string;
/**
 * Parse a nutrition day drag ID
 */
export declare function parseNutritionDayDragId(dragId: string): {
    weekNumber: number;
    dayNumber: number;
} | null;
/**
 * Create a unique drag ID for a nutrition week
 */
export declare function createNutritionWeekDragId(weekNumber: number): string;
/**
 * Parse a nutrition week drag ID
 */
export declare function parseNutritionWeekDragId(dragId: string): {
    weekNumber: number;
} | null;
/**
 * Create a unique drag ID for a workout exercise
 */
export declare function createExerciseDragId(weekNumber: number, dayNumber: number, exerciseId: string): string;
/**
 * Parse an exercise drag ID
 */
export declare function parseExerciseDragId(dragId: string): {
    weekNumber: number;
    dayNumber: number;
    exerciseId: string;
} | null;
/**
 * Create a unique drag ID for a workout day
 */
export declare function createWorkoutDayDragId(weekNumber: number, dayNumber: number): string;
/**
 * Parse a workout day drag ID
 */
export declare function parseWorkoutDayDragId(dragId: string): {
    weekNumber: number;
    dayNumber: number;
} | null;
/**
 * Create a unique drag ID for a workout week
 */
export declare function createWorkoutWeekDragId(weekNumber: number): string;
/**
 * Parse a workout week drag ID
 */
export declare function parseWorkoutWeekDragId(dragId: string): {
    weekNumber: number;
} | null;
/**
 * Create a drop zone ID for a meal (to receive foods)
 */
export declare function createMealDropZoneId(dayNumber: number, mealId: string): string;
/**
 * Create a drop zone ID for a day (to receive meals)
 */
export declare function createDayDropZoneId(dayNumber: number): string;
/**
 * Create a drop zone ID for a nutrition week (to receive days)
 */
export declare function createNutritionWeekDropZoneId(weekNumber: number): string;
/**
 * Create a drop zone ID for a workout day (to receive exercises)
 */
export declare function createWorkoutDayDropZoneId(weekNumber: number, dayNumber: number): string;
/**
 * Create a drop zone ID for a workout week (to receive days)
 */
export declare function createWorkoutWeekDropZoneId(weekNumber: number): string;
/**
 * Check if two drag IDs are of the same type
 */
export declare function isSameDragType(dragId1: string, dragId2: string): boolean;
/**
 * Extract drag type from drag ID
 */
export declare function getDragType(dragId: string): string;
/**
 * Check if a drag ID represents a nutrition food
 */
export declare function isFoodDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a nutrition meal
 */
export declare function isMealDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a nutrition day
 */
export declare function isNutritionDayDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a nutrition week
 */
export declare function isNutritionWeekDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a workout exercise
 */
export declare function isExerciseDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a workout day
 */
export declare function isWorkoutDayDragId(dragId: string): boolean;
/**
 * Check if a drag ID represents a workout week
 */
export declare function isWorkoutWeekDragId(dragId: string): boolean;
//# sourceMappingURL=dnd-helpers.d.ts.map