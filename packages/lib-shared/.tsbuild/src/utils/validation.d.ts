/**
 * Validation Utilities
 *
 * Centralized validation functions
 * Follows DRY principle - eliminates duplicate validation code
 */
/**
 * Email validation
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Password validation
 */
export interface PasswordValidationResult {
    valid: boolean;
    errors: string[];
}
export declare function validatePassword(password: string, options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireNumber?: boolean;
}): PasswordValidationResult;
/**
 * Check if passwords match
 */
export declare function passwordsMatch(password: string, confirmPassword: string): boolean;
/**
 * Required field validation
 */
export declare function isRequired(value: unknown): boolean;
/**
 * Number validation
 */
export declare function isValidNumber(value: string | number, options?: {
    min?: number;
    max?: number;
}): boolean;
/**
 * URL validation
 */
export declare function isValidUrl(url: string): boolean;
/**
 * Generic validation function
 */
export type Validator<T = unknown> = (value: T, allValues?: T) => string | null;
export declare function createValidator<T>(validators: Validator<T>[]): (value: T) => string | null;
//# sourceMappingURL=validation.d.ts.map