/**
 * Error Handler Core Types - Cross-Platform Interfaces
 *
 * Common interfaces and types for error handling across platforms.
 * This module contains only types and interfaces, no platform-specific code.
 *
 * NOTE: These types are defined here in lib-shared to avoid cyclic dependencies.
 * lib-api re-exports these for backwards compatibility.
 */
/**
 * Create a standardized error response object (cross-platform)
 *
 * This function returns a plain object that can be used on any platform.
 * Platform-specific wrappers (like NextResponse) should wrap this result.
 */
export function createErrorResponseObject(params) {
    return {
        error: params.error,
        code: params.code,
        details: params.details,
        timestamp: new Date().toISOString(),
    };
}
/**
 * Create a standardized API response object (cross-platform)
 */
export function createApiResponseObject(data, error, status = 200) {
    return {
        data,
        error,
        status,
    };
}
/**
 * Error Codes
 */
export const ERROR_CODES = {
    INSUFFICIENT_CREDITS: 'INSUFFICIENT_CREDITS',
    INVALID_INPUT: 'INVALID_INPUT',
    AI_GENERATION_FAILED: 'AI_GENERATION_FAILED',
    PARSE_ERROR: 'PARSE_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};
