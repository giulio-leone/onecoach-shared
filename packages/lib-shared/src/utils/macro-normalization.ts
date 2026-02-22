/**
 * Macro Normalization Utilities
 *
 * Utilities for normalizing macros from specific quantities to per-100g values
 */

import type { Macros } from '@giulio-leone/types';

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
export function convertMacrosTo100g(macros: Macros, quantity: number, unit: string = 'g'): Macros {
  // If quantity is 0 or negative, return macros as-is (invalid case)
  if (quantity <= 0) {
    console.warn('[convertMacrosTo100g] Invalid quantity:', quantity);
    return macros;
  }

  // Convert quantity to grams if needed
  let quantityInGrams = quantity;

  // Handle common unit conversions
  const unitLower = unit.toLowerCase();
  if (unitLower === 'kg') {
    quantityInGrams = quantity * 1000;
  } else if (unitLower === 'lb' || unitLower === 'lbs') {
    quantityInGrams = quantity * 453.592; // 1 lb = 453.592g
  } else if (unitLower === 'oz') {
    quantityInGrams = quantity * 28.3495; // 1 oz = 28.3495g
  } else if (unitLower === 'ml') {
    // For liquids, assume 1ml = 1g (water density)
    // This is an approximation and may not be accurate for all liquids
    quantityInGrams = quantity;
  } else if (unitLower === 'l') {
    quantityInGrams = quantity * 1000;
  } else if (
    unitLower !== 'g' &&
    unitLower !== 'gr' &&
    unitLower !== 'gram' &&
    unitLower !== 'grams'
  ) {
    console.warn(`[convertMacrosTo100g] Unknown unit "${unit}", treating as grams`);
  }

  // Calculate the conversion factor
  const factor = 100 / quantityInGrams;

  // Apply conversion to all macro values
  // Round to 2 decimals for all macros
  return {
    calories: Math.round((macros.calories || 0) * factor * 100) / 100, // Round to 2 decimals
    protein: Math.round((macros.protein || 0) * factor * 100) / 100,
    carbs: Math.round((macros.carbs || 0) * factor * 100) / 100,
    fats: Math.round((macros.fats || 0) * factor * 100) / 100,
    fiber: macros.fiber ? Math.round(macros.fiber * factor * 100) / 100 : undefined,
  };
}

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
export function areMacrosAlreadyPer100g(macros: Macros, quantity: number): boolean {
  // If quantity is exactly 100g, assume macros are already per-100g
  if (Math.abs(quantity - 100) < 0.1) {
    return true;
  }

  // Calculate expected calories from macros (4 cal/g protein and carbs, 9 cal/g fats)
  const calculatedCalories =
    (macros.protein || 0) * 4 + (macros.carbs || 0) * 4 + (macros.fats || 0) * 9;

  // Allow 15% tolerance for calculation differences
  const tolerance = 0.15;
  const caloriesDiff = Math.abs(calculatedCalories - (macros.calories || 0));
  const caloriesMatch = caloriesDiff <= (macros.calories || 0) * tolerance;

  // If calories match the macro calculation, likely already per-100g
  // (because if they were for quantity, the ratio would be off)
  if (caloriesMatch) {
    // Additional check: macros should be reasonable for 100g
    // Most foods have between 0-900 calories per 100g
    if ((macros.calories || 0) >= 0 && (macros.calories || 0) <= 900) {
      return true;
    }
  }

  // If we get here, likely the macros are for the specific quantity
  return false;
}

/**
 * Smart conversion that auto-detects if conversion is needed
 *
 * @param macros - The macro values
 * @param quantity - The quantity associated with these macros
 * @param unit - The unit of measurement
 * @returns Macros guaranteed to be per-100g
 */
export function ensureMacrosArePer100g(
  macros: Macros,
  quantity: number,
  unit: string = 'g'
): Macros {
  // Check if conversion is needed
  if (areMacrosAlreadyPer100g(macros, quantity)) {
    console.warn('[ensureMacrosArePer100g] Macros appear to be already per-100g, returning as-is');
    return macros;
  }

  console.warn(`[ensureMacrosArePer100g] Converting macros from ${quantity}${unit} to per-100g`);
  return convertMacrosTo100g(macros, quantity, unit);
}
