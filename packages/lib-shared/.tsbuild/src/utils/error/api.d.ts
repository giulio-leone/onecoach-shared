/**
 * API Error Response Utilities
 *
 * Standardized error responses for HTTP APIs.
 * Following: Strong Typing First, Explicit > Implicit, Predictable Data Flow
 *
 * Cross-platform: createApiErrorResponse returns plain objects.
 * createNextErrorResponse is Next.js-specific wrapper.
 */
import type { NextResponse } from 'next/server';
import type { ApiErrorResponse } from './core-types';
export type { ApiErrorResponse, ApiResponse, CreateErrorResponseParams } from './core-types';
export { createErrorResponseObject, createApiResponseObject } from './core-types';
/**
 * Create standardized API error response (cross-platform)
 *
 * @param error - Error message
 * @param code - Error code from ERROR_CODES
 * @param status - HTTP status code
 * @param details - Optional additional details
 * @returns Structured error response with status
 */
export declare function createApiErrorResponse(error: string, code: string, status: number, details?: Record<string, unknown>): {
    response: ApiErrorResponse;
    status: number;
};
/**
 * Create Next.js Response from error
 *
 * Only available in Next.js context. For generic APIs, use createApiErrorResponse.
 * This is a Next.js-specific wrapper that converts the cross-platform error object to NextResponse.
 */
export declare function createNextErrorResponse(error: string, code: string, status: number, details?: Record<string, unknown>): NextResponse<ApiErrorResponse>;
/**
 * Map custom errors to API responses
 */
export declare function mapErrorToApiResponse(error: unknown): {
    response: ApiErrorResponse;
    status: number;
};
/**
 * Generic error handler for API routes
 *
 * @example
 * try {
 *   // API logic
 * } catch (error: unknown) {
 *   return handleApiError(error);
 * }
 */
export declare function handleApiError(error: unknown): NextResponse<ApiErrorResponse>;
//# sourceMappingURL=api.d.ts.map