/**
 * Custom Error Classes
 *
 * Domain-specific error types for better error handling.
 * Following: Strong Typing First, Explicit > Implicit, Fail Fast
 */
/**
 * Base application error with error code
 */
export class AppError extends Error {
    code;
    details;
    constructor(message, code, details) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
/**
 * Validation error for input validation failures
 */
export class ValidationError extends AppError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', details);
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
/**
 * Timeout error for operations that exceed time limits
 */
export class TimeoutError extends AppError {
    timeoutMs;
    constructor(message, timeoutMs) {
        super(message, 'TIMEOUT_ERROR', { timeoutMs });
        this.timeoutMs = timeoutMs;
        this.name = 'TimeoutError';
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
/**
 * AI/LLM provider error
 */
export class ModelError extends AppError {
    provider;
    constructor(message, provider, details) {
        super(message, 'MODEL_ERROR', { provider, ...(details || {}) });
        this.provider = provider;
        this.name = 'ModelError';
        Object.setPrototypeOf(this, ModelError.prototype);
    }
}
/**
 * Insufficient credits error
 */
export class InsufficientCreditsError extends AppError {
    required;
    available;
    constructor(required, available) {
        super(`Crediti insufficienti. Richiesti: ${required}, Disponibili: ${available}`, 'INSUFFICIENT_CREDITS', { required, available });
        this.required = required;
        this.available = available;
        this.name = 'InsufficientCreditsError';
        Object.setPrototypeOf(this, InsufficientCreditsError.prototype);
    }
}
/**
 * Unauthorized error for authentication failures
 */
export class UnauthorizedError extends AppError {
    constructor(message = 'Non autorizzato') {
        super(message, 'UNAUTHORIZED', undefined);
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
/**
 * Forbidden error for authorization failures
 */
export class ForbiddenError extends AppError {
    constructor(message = 'Accesso negato') {
        super(message, 'FORBIDDEN', undefined);
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
/**
 * Not found error for missing resources
 */
export class NotFoundError extends AppError {
    resource;
    resourceId;
    constructor(resource, resourceId) {
        super(`${resource} non trovato${resourceId ? `: ${resourceId}` : ''}`, 'NOT_FOUND', {
            resource,
            resourceId,
        });
        this.resource = resource;
        this.resourceId = resourceId;
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
/**
 * Rate limit exceeded error
 */
export class RateLimitError extends AppError {
    retryAfter;
    constructor(message = 'Troppi tentativi, riprova più tardi', retryAfter) {
        super(message, 'RATE_LIMIT_EXCEEDED', { retryAfter });
        this.retryAfter = retryAfter;
        this.name = 'RateLimitError';
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}
/**
 * Conflict error for resource conflicts
 */
export class ConflictError extends AppError {
    constructor(message, details) {
        super(message, 'CONFLICT', details);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
