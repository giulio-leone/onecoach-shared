/**
 * Macro Normalization Utilities
 *
 * Utilities for normalizing macros from specific quantities to per-100g values
 */
import type { Macros } from '@onecoach/types';
/**
 * Convert macros from a specific quantity to per-100g values
 *
 * @param macros - The macro values for the given quantity
 * @param quantity - The quantity in the specified unit
 * @param unit - The unit of measurement (default: 'g')
 * @returns Macros normalized to per-100g values
 *
 * @example
 * // 200g of chicken with 330 calories total
 * const macrosPer100g = convertMacrosTo100g(
 *   { calories: 330, protein: 46, carbs: 0, fats: 16 },
 *   200,
 *   'g'
 * );
 * // Result: { calories: 165, protein: 23, carbs: 0, fats: 8 }
 */
export declare function convertMacrosTo100g(macros: Macros, quantity: number, unit?: string): Macros;
/**
 * Detect if macros are likely already per-100g or for a specific quantity
 *
 * Uses heuristics to determine if the macros need conversion:
 * - If calories are very low (< 10), likely already per-100g for low-cal foods
 * - If protein + carbs + fats macros don't roughly match calorie calculation, likely needs conversion
 * - If fiber is present and reasonable, likely already per-100g
 *
 * @param macros - The macro values to check
 * @param quantity - The quantity associated with these macros
 * @returns true if macros are likely already per-100g, false if they need conversion
 *
 * Note: This is a heuristic and may not be 100% accurate in all cases
 */
export declare function areMacrosAlreadyPer100g(macros: Macros, quantity: number): boolean;
/**
 * Smart conversion that auto-detects if conversion is needed
 *
 * @param macros - The macro values
 * @param quantity - The quantity associated with these macros
 * @param unit - The unit of measurement
 * @returns Macros guaranteed to be per-100g
 */
export declare function ensureMacrosArePer100g(macros: Macros, quantity: number, unit?: string): Macros;
//# sourceMappingURL=macro-normalization.d.ts.map