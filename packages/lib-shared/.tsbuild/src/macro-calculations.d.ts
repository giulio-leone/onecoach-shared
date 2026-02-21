/**
 * Macro Calculations
 *
 * Unified utility functions for calculating and manipulating nutritional macros.
 * Following KISS and DRY principles.
 */
import type { Food, Meal, NutritionDay } from '@onecoach/types';
export interface Macros {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
}
/**
 * Normalize macro value to 2 decimal places
 * Global utility to ensure consistency across the application
 */
export declare function normalizeMacroValue(value: number): number;
/**
 * Normalize all macro values in a Macros object to 2 decimal places
 */
export declare function normalizeMacros(macros: Macros): Macros;
/**
 * Calculate total macros from an array of foods
 */
export declare function calculateMacros(foods: Food[]): Macros;
/**
 * Aggregate macros from an array of meals
 */
export declare function aggregateMealMacros(meals: Meal[]): Macros;
/**
 * Recalculate food macros proportionally when quantity changes
 */
export declare function recalculateFoodMacros(food: Food, oldQuantity: number, newQuantity: number): Macros;
/**
 * Check if AI recalculation is needed based on target macro difference
 */
export declare function needsRecalculation(day: NutritionDay, targetMacros: Macros): boolean;
/**
 * Recalculate day macros (useful after modifications)
 */
export declare function recalculateDay(day: NutritionDay): NutritionDay;
/**
 * Calculate calories from macros (validation)
 * Protein: 4 kcal/g, Carbs: 4 kcal/g, Fats: 9 kcal/g
 */
export declare function calculateCaloriesFromMacros(protein: number, carbs: number, fats: number): number;
/**
 * Calculate proportional macros when quantity changes
 * @param macros - Original macros (per 100g or per unit)
 * @param originalQuantity - Original quantity
 * @param newQuantity - New quantity
 * @returns Proportional macros for the new quantity
 */
export declare function calculateProportionalMacros(macros: Macros, originalQuantity: number, newQuantity: number): Macros;
/**
 * Sum multiple macros objects together
 * @param macrosArray - Array of macros to sum
 * @returns Summed macros
 */
export declare function sumMacros(...macrosArray: Macros[]): Macros;
/**
 * Validation result for macro coherence
 */
export interface MacroCoherenceResult {
    valid: boolean;
    errors: string[];
    deviations: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
    deviationsPercent: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
}
/**
 * Validate macro coherence between actual and expected values
 */
export declare function validateMacroCoherence(actual: Macros, expected: Macros, tolerance?: number, context?: string): MacroCoherenceResult;
//# sourceMappingURL=macro-calculations.d.ts.map