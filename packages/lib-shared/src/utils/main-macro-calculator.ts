/**
 * Main Macro Calculator
 *
 * Calculates the predominant macronutrient in a food item based on caloric contribution
 */

import type { Macros } from '@giulio-leone/types';

export type MacroType = 'PROTEIN' | 'CARBS' | 'FATS' | 'BALANCED';

export interface MainMacro {
  type: MacroType;
  percentage: number; // 0-100
}

/**
 * Calculate which macronutrient is predominant based on caloric contribution
 *
 * Algorithm:
 * 1. Calculate calories from each macro (protein: 4kcal/g, carbs: 4kcal/g, fats: 9kcal/g)
 * 2. Determine which contributes most to total calories
 * 3. Calculate percentage contribution
 *
 * @param macros - Macros per 100g
 * @returns MainMacro object with type and percentage
 *
 * @example
 * // Chicken breast (high protein)
 * calculateMainMacro({ calories: 165, protein: 31, carbs: 0, fats: 3.6 })
 * // => { type: 'PROTEIN', percentage: 75.15 }
 *
 * @example
 * // Olive oil (pure fat)
 * calculateMainMacro({ calories: 884, protein: 0, carbs: 0, fats: 100 })
 * // => { type: 'FATS', percentage: 100 }
 *
 * @example
 * // Rice (high carbs)
 * calculateMainMacro({ calories: 130, protein: 2.7, carbs: 28, fats: 0.3 })
 * // => { type: 'CARBS', percentage: 86.15 }
 */
export function calculateMainMacro(macros: Macros): MainMacro {
  const protein = macros.protein || 0;
  const carbs = macros.carbs || 0;
  const fats = macros.fats || 0;

  // Calculate calories from each macro
  const proteinCalories = protein * 4;
  const carbsCalories = carbs * 4;
  const fatsCalories = fats * 9;

  const totalCalculatedCalories = proteinCalories + carbsCalories + fatsCalories;

  // If no macros, return balanced
  if (totalCalculatedCalories === 0) {
    return { type: 'BALANCED', percentage: 0 };
  }

  // Calculate percentages
  const proteinPercentage = (proteinCalories / totalCalculatedCalories) * 100;
  const carbsPercentage = (carbsCalories / totalCalculatedCalories) * 100;
  const fatsPercentage = (fatsCalories / totalCalculatedCalories) * 100;

  // Find predominant macro (must be > 40% to be considered predominant)
  // Otherwise, it's BALANCED
  const PREDOMINANCE_THRESHOLD = 40;

  let mainType: MacroType;
  let mainPercentage: number;

  if (proteinPercentage >= carbsPercentage && proteinPercentage >= fatsPercentage) {
    mainType = 'PROTEIN';
    mainPercentage = proteinPercentage;
  } else if (carbsPercentage >= proteinPercentage && carbsPercentage >= fatsPercentage) {
    mainType = 'CARBS';
    mainPercentage = carbsPercentage;
  } else {
    mainType = 'FATS';
    mainPercentage = fatsPercentage;
  }

  // If no single macro is predominant (>40%), mark as BALANCED
  if (mainPercentage < PREDOMINANCE_THRESHOLD) {
    return { type: 'BALANCED', percentage: Math.round(mainPercentage * 100) / 100 };
  }

  // Round to 2 decimal places
  return {
    type: mainType,
    percentage: Math.round(mainPercentage * 100) / 100,
  };
}

/**
 * Get human-readable description of main macro
 */
export function getMainMacroDescription(mainMacro: MainMacro): string {
  const descriptions: Record<MacroType, string> = {
    PROTEIN: 'High Protein',
    CARBS: 'High Carbohydrates',
    FATS: 'High Fat',
    BALANCED: 'Balanced Macros',
  };

  return descriptions[mainMacro.type];
}

/**
 * Get emoji representation of main macro
 */
export function getMainMacroEmoji(mainMacro: MainMacro): string {
  const emojis: Record<MacroType, string> = {
    PROTEIN: '🥩', // Meat/protein
    CARBS: '🍞', // Bread/carbs
    FATS: '🥑', // Avocado/fats
    BALANCED: '⚖️', // Balance
  };

  return emojis[mainMacro.type];
}

/**
 * Validate main macro data
 */
export function isValidMainMacro(mainMacro: unknown): mainMacro is MainMacro {
  if (!mainMacro || typeof mainMacro !== 'object') return false;

  const mm = mainMacro as Record<string, unknown>;

  return (
    typeof mm.type === 'string' &&
    ['PROTEIN', 'CARBS', 'FATS', 'BALANCED'].includes(mm.type) &&
    typeof mm.percentage === 'number' &&
    mm.percentage >= 0 &&
    mm.percentage <= 100
  );
}
