/**
 * Main Macro Calculator
 *
 * Calculates the predominant macronutrient in a food item based on caloric contribution
 */
import type { Macros } from '@onecoach/types';
export type MacroType = 'PROTEIN' | 'CARBS' | 'FATS' | 'BALANCED';
export interface MainMacro {
    type: MacroType;
    percentage: number;
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
export declare function calculateMainMacro(macros: Macros): MainMacro;
/**
 * Get human-readable description of main macro
 */
export declare function getMainMacroDescription(mainMacro: MainMacro): string;
/**
 * Get emoji representation of main macro
 */
export declare function getMainMacroEmoji(mainMacro: MainMacro): string;
/**
 * Validate main macro data
 */
export declare function isValidMainMacro(mainMacro: unknown): mainMacro is MainMacro;
//# sourceMappingURL=main-macro-calculator.d.ts.map