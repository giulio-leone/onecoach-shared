/**
 * Password Validation Utilities
 *
 * Utility riusabile per validazione password con policy di sicurezza
 */
export interface PasswordValidationResult {
    valid: boolean;
    error?: string;
}
export interface PasswordRequirements {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
}
/**
 * Requisiti password per amministratori
 */
export declare const ADMIN_PASSWORD_REQUIREMENTS: PasswordRequirements;
/**
 * Valida una password secondo i requisiti specificati
 */
export declare function validatePassword(password: string, requirements?: PasswordRequirements): PasswordValidationResult;
/**
 * Genera un messaggio descrittivo dei requisiti password
 */
export declare function getPasswordRequirementsMessage(requirements?: PasswordRequirements): string;
//# sourceMappingURL=password-validation.d.ts.map