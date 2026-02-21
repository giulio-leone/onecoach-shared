/**
 * Custom Error Classes
 *
 * Domain-specific error types for better error handling.
 * Following: Strong Typing First, Explicit > Implicit, Fail Fast
 */
/**
 * Base application error with error code
 */
export declare class AppError extends Error {
    readonly code: string;
    readonly details?: unknown | undefined;
    constructor(message: string, code: string, details?: unknown | undefined);
}
/**
 * Validation error for input validation failures
 */
export declare class ValidationError extends AppError {
    constructor(message: string, details?: unknown);
}
/**
 * Timeout error for operations that exceed time limits
 */
export declare class TimeoutError extends AppError {
    readonly timeoutMs: number;
    constructor(message: string, timeoutMs: number);
}
/**
 * AI/LLM provider error
 */
export declare class ModelError extends AppError {
    readonly provider: string;
    constructor(message: string, provider: string, details?: Record<string, unknown>);
}
/**
 * Insufficient credits error
 */
export declare class InsufficientCreditsError extends AppError {
    readonly required: number;
    readonly available: number;
    constructor(required: number, available: number);
}
/**
 * Unauthorized error for authentication failures
 */
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
/**
 * Forbidden error for authorization failures
 */
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
/**
 * Not found error for missing resources
 */
export declare class NotFoundError extends AppError {
    readonly resource: string;
    readonly resourceId?: string | undefined;
    constructor(resource: string, resourceId?: string | undefined);
}
/**
 * Rate limit exceeded error
 */
export declare class RateLimitError extends AppError {
    readonly retryAfter?: number | undefined;
    constructor(message?: string, retryAfter?: number | undefined);
}
/**
 * Conflict error for resource conflicts
 */
export declare class ConflictError extends AppError {
    constructor(message: string, details?: unknown);
}
//# sourceMappingURL=custom-errors.d.ts.map