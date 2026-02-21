/**
 * Validator Utilities
 *
 * Funzioni per validazione input
 */
/**
 * Valida un workout program
 *
 * @param workout - Workout program da validare
 * @returns true se valido
 */
export function isValidWorkoutProgram(workout) {
    if (!workout.name || workout.name.trim() === '') {
        return false;
    }
    if (!workout.difficulty) {
        return false;
    }
    if (!workout.weeks || workout.weeks.length === 0) {
        return false;
    }
    return true;
}
/**
 * Valida un nutrition plan
 *
 * @param plan - Nutrition plan da validare
 * @returns true se valido
 */
export function isValidNutritionPlan(plan) {
    if (!plan.name || plan.name.trim() === '') {
        return false;
    }
    if (!plan.goals || plan.goals.length === 0) {
        return false;
    }
    if (!plan.targetMacros || !isValidMacros(plan.targetMacros)) {
        return false;
    }
    return true;
}
/**
 * Valida macronutrienti
 *
 * @param macros - Macros da validare
 * @returns true se validi
 */
export function isValidMacros(macros) {
    if (macros.calories !== undefined && (macros.calories < 0 || macros.calories > 10000)) {
        return false;
    }
    if (macros.protein !== undefined && (macros.protein < 0 || macros.protein > 500)) {
        return false;
    }
    if (macros.carbs !== undefined && (macros.carbs < 0 || macros.carbs > 1000)) {
        return false;
    }
    if (macros.fats !== undefined && (macros.fats < 0 || macros.fats > 300)) {
        return false;
    }
    return true;
}
/**
 * Valida email
 *
 * @param email - Email da validare
 * @returns true se valida
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Valida stringa non vuota
 *
 * @param value - Valore da validare
 * @param minLength - Lunghezza minima (default: 1)
 * @returns true se valida
 */
export function isNonEmptyString(value, minLength = 1) {
    return typeof value === 'string' && value.trim().length >= minLength;
}
/**
 * Valida numero in range
 *
 * @param value - Valore da validare
 * @param min - Valore minimo
 * @param max - Valore massimo
 * @returns true se valido
 */
export function isInRange(value, min, max) {
    return typeof value === 'number' && value >= min && value <= max;
}
/**
 * Valida array non vuoto
 *
 * @param array - Array da validare
 * @returns true se non vuoto
 */
export function isNonEmptyArray(array) {
    return Array.isArray(array) && array.length > 0;
}
