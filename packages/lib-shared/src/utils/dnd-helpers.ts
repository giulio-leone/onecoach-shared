/**
 * Platform-agnostic Drag and Drop Helper Utilities
 *
 * These pure functions handle array reordering and moving items between lists.
 * They are completely independent of any drag and drop library and can be
 * used in both web (React) and mobile (React Native) contexts.
 */

import type {
  ReorderOperation,
  ReorderResult,
  MoveOperation,
  MoveResult,
} from '@giulio-leone/types';

// ============================================================================
// Generic Array Reordering
// ============================================================================

/**
 * Reorder items within the same array (immutable)
 *
 * @example
 * reorderArray({ items: [1, 2, 3], sourceIndex: 0, destinationIndex: 2 })
 * // Returns: { items: [2, 3, 1] }
 */
export function reorderArray<T>(operation: ReorderOperation<T>): ReorderResult<T> {
  const { items, sourceIndex, destinationIndex } = operation;

  // Validation: Check for null/undefined
  if (!items) {
    throw new Error('Items array cannot be null or undefined');
  }

  // Validation: Check for empty array
  if (items.length === 0) {
    throw new Error('Cannot reorder empty array');
  }

  // Validation: Check for NaN indices
  if (isNaN(sourceIndex) || isNaN(destinationIndex)) {
    throw new Error(
      `Invalid indices: sourceIndex=${sourceIndex}, destinationIndex=${destinationIndex}`
    );
  }

  // Validation: Check for valid range
  if (sourceIndex < 0 || sourceIndex >= items.length) {
    throw new Error(`Invalid sourceIndex: ${sourceIndex} for array of length ${items.length}`);
  }
  if (destinationIndex < 0 || destinationIndex >= items.length) {
    throw new Error(
      `Invalid destinationIndex: ${destinationIndex} for array of length ${items.length}`
    );
  }

  // No-op if same position
  if (sourceIndex === destinationIndex) {
    return { items };
  }

  // Create a copy and reorder
  const result = Array.from(items);
  const [removed] = result.splice(sourceIndex, 1);
  if (removed === undefined) {
    return { items: result };
  }
  result.splice(destinationIndex, 0, removed);

  return { items: result };
}

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
export function moveItemBetweenArrays<T>(operation: MoveOperation<T>): MoveResult<T> {
  const { sourceList, destinationList, sourceIndex, destinationIndex } = operation;

  // Validation: Check for null/undefined
  if (!sourceList || !destinationList) {
    throw new Error('Source and destination lists cannot be null or undefined');
  }

  // Validation: Check for empty source array
  if (sourceList.length === 0) {
    throw new Error('Cannot move item from empty source array');
  }

  // Validation: Check for NaN indices
  if (isNaN(sourceIndex) || isNaN(destinationIndex)) {
    throw new Error(
      `Invalid indices: sourceIndex=${sourceIndex}, destinationIndex=${destinationIndex}`
    );
  }

  // Validation: Check for valid range
  if (sourceIndex < 0 || sourceIndex >= sourceList.length) {
    throw new Error(
      `Invalid sourceIndex: ${sourceIndex} for source array of length ${sourceList.length}`
    );
  }
  // Note: destinationIndex can be equal to destinationList.length (append to end)
  if (destinationIndex < 0 || destinationIndex > destinationList.length) {
    throw new Error(
      `Invalid destinationIndex: ${destinationIndex} for destination array of length ${destinationList.length}`
    );
  }

  // Create copies
  const newSourceList = Array.from(sourceList);
  const newDestinationList = Array.from(destinationList);

  // Remove from source
  const [removed] = newSourceList.splice(sourceIndex, 1);
  if (removed === undefined) {
    return {
      sourceList: newSourceList,
      destinationList: newDestinationList,
      movedItem: undefined as T,
    };
  }

  // Add to destination
  newDestinationList.splice(destinationIndex, 0, removed);

  return {
    sourceList: newSourceList,
    destinationList: newDestinationList,
    movedItem: removed,
  };
}

// ============================================================================
// Drag ID Utilities
// ============================================================================

/**
 * Create a unique drag ID for a food item
 */
export function createFoodDragId(dayNumber: number, mealId: string, foodId: string): string {
  return `food-${dayNumber}-${mealId}-${foodId}`;
}

/**
 * Parse a food drag ID
 */
export function parseFoodDragId(dragId: string): {
  dayNumber: number;
  mealId: string;
  foodId: string;
} | null {
  const match = dragId.match(/^food-(\d+)-(.+)-(.+)$/);
  if (!match || !match[1] || !match[2] || !match[3]) return null;

  return {
    dayNumber: parseInt(match[1], 10),
    mealId: match[2],
    foodId: match[3],
  };
}

/**
 * Create a unique drag ID for a meal
 */
export function createMealDragId(dayNumber: number, mealId: string): string {
  return `meal-${dayNumber}-${mealId}`;
}

/**
 * Parse a meal drag ID
 */
export function parseMealDragId(dragId: string): {
  dayNumber: number;
  mealId: string;
} | null {
  const match = dragId.match(/^meal-(\d+)-(.+)$/);
  if (!match || !match[1] || !match[2]) return null;

  return {
    dayNumber: parseInt(match[1], 10),
    mealId: match[2],
  };
}

/**
 * Create a unique drag ID for a nutrition day
 */
export function createNutritionDayDragId(weekNumber: number, dayNumber: number): string {
  return `nutrition-day-${weekNumber}-${dayNumber}`;
}

/**
 * Parse a nutrition day drag ID
 */
export function parseNutritionDayDragId(dragId: string): {
  weekNumber: number;
  dayNumber: number;
} | null {
  const match = dragId.match(/^nutrition-day-(\d+)-(\d+)$/);
  if (!match || !match[1] || !match[2]) return null;

  return {
    weekNumber: parseInt(match[1], 10),
    dayNumber: parseInt(match[2], 10),
  };
}

/**
 * Create a unique drag ID for a nutrition week
 */
export function createNutritionWeekDragId(weekNumber: number): string {
  return `nutrition-week-${weekNumber}`;
}

/**
 * Parse a nutrition week drag ID
 */
export function parseNutritionWeekDragId(dragId: string): {
  weekNumber: number;
} | null {
  const match = dragId.match(/^nutrition-week-(\d+)$/);
  if (!match || !match[1]) return null;

  return {
    weekNumber: parseInt(match[1], 10),
  };
}

/**
 * Create a unique drag ID for a workout exercise
 */
export function createExerciseDragId(
  weekNumber: number,
  dayNumber: number,
  exerciseId: string
): string {
  return `exercise-${weekNumber}-${dayNumber}-${exerciseId}`;
}

/**
 * Parse an exercise drag ID
 */
export function parseExerciseDragId(dragId: string): {
  weekNumber: number;
  dayNumber: number;
  exerciseId: string;
} | null {
  const match = dragId.match(/^exercise-(\d+)-(\d+)-(.+)$/);
  if (!match || !match[1] || !match[2] || !match[3]) return null;

  return {
    weekNumber: parseInt(match[1], 10),
    dayNumber: parseInt(match[2], 10),
    exerciseId: match[3],
  };
}

/**
 * Create a unique drag ID for a workout day
 */
export function createWorkoutDayDragId(weekNumber: number, dayNumber: number): string {
  return `workout-day-${weekNumber}-${dayNumber}`;
}

/**
 * Parse a workout day drag ID
 */
export function parseWorkoutDayDragId(dragId: string): {
  weekNumber: number;
  dayNumber: number;
} | null {
  const match = dragId.match(/^workout-day-(\d+)-(\d+)$/);
  if (!match || !match[1] || !match[2]) return null;

  return {
    weekNumber: parseInt(match[1], 10),
    dayNumber: parseInt(match[2], 10),
  };
}

/**
 * Create a unique drag ID for a workout week
 */
export function createWorkoutWeekDragId(weekNumber: number): string {
  return `workout-week-${weekNumber}`;
}

/**
 * Parse a workout week drag ID
 */
export function parseWorkoutWeekDragId(dragId: string): {
  weekNumber: number;
} | null {
  const match = dragId.match(/^workout-week-(\d+)$/);
  if (!match || !match[1]) return null;

  return {
    weekNumber: parseInt(match[1], 10),
  };
}

// ============================================================================
// Drop Zone ID Utilities
// ============================================================================

/**
 * Create a drop zone ID for a meal (to receive foods)
 */
export function createMealDropZoneId(dayNumber: number, mealId: string): string {
  return `meal-dropzone-${dayNumber}-${mealId}`;
}

/**
 * Create a drop zone ID for a day (to receive meals)
 */
export function createDayDropZoneId(dayNumber: number): string {
  return `day-dropzone-${dayNumber}`;
}

/**
 * Create a drop zone ID for a nutrition week (to receive days)
 */
export function createNutritionWeekDropZoneId(weekNumber: number): string {
  return `nutrition-week-dropzone-${weekNumber}`;
}

/**
 * Create a drop zone ID for a workout day (to receive exercises)
 */
export function createWorkoutDayDropZoneId(weekNumber: number, dayNumber: number): string {
  return `workout-day-dropzone-${weekNumber}-${dayNumber}`;
}

/**
 * Create a drop zone ID for a workout week (to receive days)
 */
export function createWorkoutWeekDropZoneId(weekNumber: number): string {
  return `workout-week-dropzone-${weekNumber}`;
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Check if two drag IDs are of the same type
 */
export function isSameDragType(dragId1: string, dragId2: string): boolean {
  const type1 = dragId1.split('-')[0];
  const type2 = dragId2.split('-')[0];
  return type1 === type2;
}

/**
 * Extract drag type from drag ID
 */
export function getDragType(dragId: string): string {
  const parts = dragId.split('-');
  const type = parts[0];
  if (!type) {
    return '';
  }
  return type;
}

/**
 * Check if a drag ID represents a nutrition food
 */
export function isFoodDragId(dragId: string): boolean {
  return dragId.startsWith('food-');
}

/**
 * Check if a drag ID represents a nutrition meal
 */
export function isMealDragId(dragId: string): boolean {
  return dragId.startsWith('meal-');
}

/**
 * Check if a drag ID represents a nutrition day
 */
export function isNutritionDayDragId(dragId: string): boolean {
  return dragId.startsWith('nutrition-day-');
}

/**
 * Check if a drag ID represents a nutrition week
 */
export function isNutritionWeekDragId(dragId: string): boolean {
  return dragId.startsWith('nutrition-week-');
}

/**
 * Check if a drag ID represents a workout exercise
 */
export function isExerciseDragId(dragId: string): boolean {
  return dragId.startsWith('exercise-');
}

/**
 * Check if a drag ID represents a workout day
 */
export function isWorkoutDayDragId(dragId: string): boolean {
  return dragId.startsWith('workout-day-');
}

/**
 * Check if a drag ID represents a workout week
 */
export function isWorkoutWeekDragId(dragId: string): boolean {
  return dragId.startsWith('workout-week-');
}
