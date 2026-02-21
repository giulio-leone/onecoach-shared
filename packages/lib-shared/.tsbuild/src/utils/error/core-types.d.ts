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
 * Standard API error response structure
 */
export interface ApiErrorResponse {
    readonly error: string;
    readonly code: string;
    readonly details?: unknown;
    readonly timestamp: string;
}
/**
 * Standard API response structure
 */
export interface ApiResponse<T = unknown> {
    readonly data?: T;
    readonly error?: ApiErrorResponse;
    readonly status: number;
}
/**
 * Error response creation parameters
 */
export interface CreateErrorResponseParams {
    error: string;
    code: string;
    status: number;
    details?: unknown;
}
/**
 * Create a standardized error response object (cross-platform)
 *
 * This function returns a plain object that can be used on any platform.
 * Platform-specific wrappers (like NextResponse) should wrap this result.
 */
export declare function createErrorResponseObject(params: CreateErrorResponseParams): ApiErrorResponse;
/**
 * Create a standardized API response object (cross-platform)
 */
export declare function createApiResponseObject<T>(data?: T, error?: ApiErrorResponse, status?: number): ApiResponse<T>;
/**
 * Error Codes
 */
export declare const ERROR_CODES: {
    readonly INSUFFICIENT_CREDITS: "INSUFFICIENT_CREDITS";
    readonly INVALID_INPUT: "INVALID_INPUT";
    readonly AI_GENERATION_FAILED: "AI_GENERATION_FAILED";
    readonly PARSE_ERROR: "PARSE_ERROR";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
/**
 * HTTP Status Codes
 */
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly PAYMENT_REQUIRED: 402;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_SERVER_ERROR: 500;
};
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
//# sourceMappingURL=core-types.d.ts.map