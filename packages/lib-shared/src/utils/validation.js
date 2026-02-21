/**
 * Validation Utilities
 *
 * Centralized validation functions
 * Follows DRY principle - eliminates duplicate validation code
 */
/**
 * Email validation
 */
export function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
export function validatePassword(password, options = {}) {
    const { minLength = 8, requireUppercase = false, requireNumber = false } = options;
    const errors = [];
    if (password.length < minLength) {
        errors.push(`La password deve essere di almeno ${minLength} caratteri`);
    }
    if (requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('La password deve contenere almeno una lettera maiuscola');
    }
    if (requireNumber && !/\d/.test(password)) {
        errors.push('La password deve contenere almeno un numero');
    }
    return {
        valid: errors.length === 0,
        errors,
    };
}
/**
 * Check if passwords match
 */
export function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}
/**
 * Required field validation
 */
export function isRequired(value) {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return value !== null && value !== undefined;
}
/**
 * Number validation
 */
export function isValidNumber(value, options = {}) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num))
        return false;
    if (options.min !== undefined && num < options.min)
        return false;
    if (options.max !== undefined && num > options.max)
        return false;
    return true;
}
/**
 * URL validation
 */
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_error) {
        return false;
    }
}
export function createValidator(validators) {
    return (value) => {
        for (const validator of validators) {
            const error = validator(value);
            if (error)
                return error;
        }
        return null;
    };
}
