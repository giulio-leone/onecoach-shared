/**
 * Macro Calculations
 *
 * Unified utility functions for calculating and manipulating nutritional macros.
 * Following KISS and DRY principles.
 */
/**
 * Normalize macro value to 2 decimal places
 * Global utility to ensure consistency across the application
 */
export function normalizeMacroValue(value) {
    return Math.round(value * 100) / 100;
}
/**
 * Normalize all macro values in a Macros object to 2 decimal places
 */
export function normalizeMacros(macros) {
    return {
        calories: normalizeMacroValue(macros.calories),
        protein: normalizeMacroValue(macros.protein),
        carbs: normalizeMacroValue(macros.carbs),
        fats: normalizeMacroValue(macros.fats),
        fiber: macros.fiber !== undefined ? normalizeMacroValue(macros.fiber) : undefined,
    };
}
/**
 * Calculate total macros from an array of foods
 */
export function calculateMacros(foods) {
    const result = foods.reduce((acc, food) => ({
        calories: acc.calories + (food.macros?.calories || 0),
        protein: acc.protein + (food.macros?.protein || 0),
        carbs: acc.carbs + (food.macros?.carbs || 0),
        fats: acc.fats + (food.macros?.fats || 0),
        fiber: (acc.fiber || 0) + (food.macros?.fiber || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
    return normalizeMacros(result);
}
/**
 * Aggregate macros from an array of meals
 */
export function aggregateMealMacros(meals) {
    const result = meals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.totalMacros?.calories || 0),
        protein: acc.protein + (meal.totalMacros?.protein || 0),
        carbs: acc.carbs + (meal.totalMacros?.carbs || 0),
        fats: acc.fats + (meal.totalMacros?.fats || 0),
        fiber: (acc.fiber || 0) + (meal.totalMacros?.fiber || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
    return normalizeMacros(result);
}
/**
 * Recalculate food macros proportionally when quantity changes
 */
export function recalculateFoodMacros(food, oldQuantity, newQuantity) {
    if (!food.macros) {
        return { calories: 0, protein: 0, carbs: 0, fats: 0 };
    }
    if (oldQuantity === 0 || newQuantity === 0) {
        return food.macros;
    }
    const ratio = newQuantity / oldQuantity;
    const baseMacros = food.macros;
    return normalizeMacros({
        calories: (baseMacros?.calories || 0) * ratio,
        protein: (baseMacros?.protein || 0) * ratio,
        carbs: (baseMacros?.carbs || 0) * ratio,
        fats: (baseMacros?.fats || 0) * ratio,
        fiber: baseMacros?.fiber ? baseMacros.fiber * ratio : undefined,
    });
}
/**
 * Check if AI recalculation is needed based on target macro difference
 */
export function needsRecalculation(day, targetMacros) {
    const dayMacros = aggregateMealMacros(day.meals);
    const tolerance = 0.05;
    const caloriesDiff = Math.abs(dayMacros.calories - targetMacros.calories) / targetMacros.calories;
    const proteinDiff = Math.abs(dayMacros.protein - targetMacros.protein) / targetMacros.protein;
    const carbsDiff = Math.abs(dayMacros.carbs - targetMacros.carbs) / targetMacros.carbs;
    const fatsDiff = Math.abs(dayMacros.fats - targetMacros.fats) / targetMacros.fats;
    return (caloriesDiff > tolerance ||
        proteinDiff > tolerance ||
        carbsDiff > tolerance ||
        fatsDiff > tolerance);
}
/**
 * Recalculate day macros (useful after modifications)
 */
export function recalculateDay(day) {
    const meals = day.meals.map((meal) => ({
        ...meal,
        totalMacros: calculateMacros(meal.foods),
    }));
    return {
        ...day,
        meals,
        totalMacros: aggregateMealMacros(meals),
    };
}
/**
 * Calculate calories from macros (validation)
 * Protein: 4 kcal/g, Carbs: 4 kcal/g, Fats: 9 kcal/g
 */
export function calculateCaloriesFromMacros(protein, carbs, fats) {
    return normalizeMacroValue(protein * 4 + carbs * 4 + fats * 9);
}
/**
 * Calculate proportional macros when quantity changes
 * @param macros - Original macros (per 100g or per unit)
 * @param originalQuantity - Original quantity
 * @param newQuantity - New quantity
 * @returns Proportional macros for the new quantity
 */
export function calculateProportionalMacros(macros, originalQuantity, newQuantity) {
    if (originalQuantity === 0 || newQuantity === 0) {
        return { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: macros.fiber ? 0 : undefined };
    }
    const ratio = newQuantity / originalQuantity;
    return normalizeMacros({
        calories: macros.calories * ratio,
        protein: macros.protein * ratio,
        carbs: macros.carbs * ratio,
        fats: macros.fats * ratio,
        fiber: macros.fiber ? macros.fiber * ratio : undefined,
    });
}
/**
 * Sum multiple macros objects together
 * @param macrosArray - Array of macros to sum
 * @returns Summed macros
 */
export function sumMacros(...macrosArray) {
    const result = macrosArray.reduce((acc, macros) => ({
        calories: acc.calories + (macros.calories || 0),
        protein: acc.protein + (macros.protein || 0),
        carbs: acc.carbs + (macros.carbs || 0),
        fats: acc.fats + (macros.fats || 0),
        fiber: (acc.fiber || 0) + (macros.fiber || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 });
    return normalizeMacros(result);
}
/**
 * Validate macro coherence between actual and expected values
 */
export function validateMacroCoherence(actual, expected, tolerance = 0.05, context = 'macros') {
    const errors = [];
    const deviations = {
        calories: actual.calories - expected.calories,
        protein: actual.protein - expected.protein,
        carbs: actual.carbs - expected.carbs,
        fats: actual.fats - expected.fats,
    };
    const deviationsPercent = {
        calories: expected.calories > 0 ? Math.abs(deviations.calories) / expected.calories : 0,
        protein: expected.protein > 0 ? Math.abs(deviations.protein) / expected.protein : 0,
        carbs: expected.carbs > 0 ? Math.abs(deviations.carbs) / expected.carbs : 0,
        fats: expected.fats > 0 ? Math.abs(deviations.fats) / expected.fats : 0,
    };
    if (deviationsPercent.calories > tolerance) {
        errors.push(`${context}: calories (${actual.calories.toFixed(1)}) deviate more than ${(tolerance * 100).toFixed(0)}% from expected (${expected.calories.toFixed(1)})`);
    }
    if (deviationsPercent.protein > tolerance) {
        errors.push(`${context}: protein (${actual.protein.toFixed(1)}) deviate more than ${(tolerance * 100).toFixed(0)}% from expected (${expected.protein.toFixed(1)})`);
    }
    if (deviationsPercent.carbs > tolerance) {
        errors.push(`${context}: carbs (${actual.carbs.toFixed(1)}) deviate more than ${(tolerance * 100).toFixed(0)}% from expected (${expected.carbs.toFixed(1)})`);
    }
    if (deviationsPercent.fats > tolerance) {
        errors.push(`${context}: fats (${actual.fats.toFixed(1)}) deviate more than ${(tolerance * 100).toFixed(0)}% from expected (${expected.fats.toFixed(1)})`);
    }
    return {
        valid: errors.length === 0,
        errors,
        deviations,
        deviationsPercent,
    };
}
