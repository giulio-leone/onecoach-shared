/**
 * Validation Utilities
 *
 * Common validation functions for form inputs and data.
 * Following KISS and DRY principles.
 */
import type { Macros } from './macro-calculations';
/**
 * Validate numeric quantity
 */
export declare function validateQuantity(value: number, min?: number, max?: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate macros object
 */
export declare function validateMacros(macros: Partial<Macros>): {
    valid: boolean;
    error?: string;
};
/**
 * Validate date range
 */
export declare function validateDateRange(startDate: Date, endDate: Date): {
    valid: boolean;
    error?: string;
};
/**
 * Validate email (simple)
 */
export declare function validateEmail(email: string): {
    valid: boolean;
    error?: string;
};
/**
 * Validate required string
 */
export declare function validateRequired(value: string, fieldName?: string): {
    valid: boolean;
    error?: string;
};
/**
 * Validate string length
 */
export declare function validateLength(value: string, min: number, max: number, fieldName?: string): {
    valid: boolean;
    error?: string;
};
/**
 * Validate weight (kg)
 */
export declare function validateWeight(weight: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate body fat percentage
 */
export declare function validateBodyFat(bodyFat: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate circumference measurement (cm)
 */
export declare function validateCircumference(circumference: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate reps count
 */
export declare function validateReps(reps: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate weight for exercise (kg)
 */
export declare function validateExerciseWeight(weight: number): {
    valid: boolean;
    error?: string;
};
/**
 * Validate rest time (seconds)
 */
export declare function validateRestTime(seconds: number): {
    valid: boolean;
    error?: string;
};
/**
 * Sanitize string (remove HTML, trim)
 */
export declare function sanitizeString(value: string): string;
/**
 * Validate and sanitize notes
 */
export declare function validateNotes(notes: string, maxLength?: number): {
    valid: boolean;
    error?: string;
};
//# sourceMappingURL=validation-utils.d.ts.map