/**
 * Validator Utilities
 *
 * Funzioni per validazione input
 */
import type { WorkoutProgram, NutritionPlan, Macros } from '@onecoach/types';
/**
 * Valida un workout program
 *
 * @param workout - Workout program da validare
 * @returns true se valido
 */
export declare function isValidWorkoutProgram(workout: Partial<WorkoutProgram>): boolean;
/**
 * Valida un nutrition plan
 *
 * @param plan - Nutrition plan da validare
 * @returns true se valido
 */
export declare function isValidNutritionPlan(plan: Partial<NutritionPlan>): boolean;
/**
 * Valida macronutrienti
 *
 * @param macros - Macros da validare
 * @returns true se validi
 */
export declare function isValidMacros(macros: Partial<Macros>): boolean;
/**
 * Valida email
 *
 * @param email - Email da validare
 * @returns true se valida
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Valida stringa non vuota
 *
 * @param value - Valore da validare
 * @param minLength - Lunghezza minima (default: 1)
 * @returns true se valida
 */
export declare function isNonEmptyString(value: string, minLength?: number): boolean;
/**
 * Valida numero in range
 *
 * @param value - Valore da validare
 * @param min - Valore minimo
 * @param max - Valore massimo
 * @returns true se valido
 */
export declare function isInRange(value: number, min: number, max: number): boolean;
/**
 * Valida array non vuoto
 *
 * @param array - Array da validare
 * @returns true se non vuoto
 */
export declare function isNonEmptyArray<T>(array: T[]): boolean;
/**
 * Valida una password
 *
 * @param password - Password da validare
 * @returns Oggetto con esito e eventuale errore
 */
export declare function validatePassword(password: string): {
    valid: boolean;
    error?: string;
};
//# sourceMappingURL=validators.d.ts.map