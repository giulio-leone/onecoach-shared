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
import { ERROR_CODES, HTTP_STATUS, createErrorResponseObject } from './core-types';
import { getErrorDetails, isZodError } from './core';
import {
  AppError,
  InsufficientCreditsError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ConflictError,
  ValidationError,
} from './custom-errors';
import type { ApiErrorResponse } from './core-types';


// Re-export core types for convenience
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
export function createApiErrorResponse(
  error: string,
  code: string,
  status: number,
  details?: Record<string, unknown>
): { response: ApiErrorResponse; status: number } {
  const response = createErrorResponseObject({ error, code, status, details });
  return { response, status };
}

/**
 * Create Next.js Response from error
 *
 * Only available in Next.js context. For generic APIs, use createApiErrorResponse.
 * This is a Next.js-specific wrapper that converts the cross-platform error object to NextResponse.
 */
export function createNextErrorResponse(
  error: string,
  code: string,
  status: number,
  details?: Record<string, unknown>
): NextResponse<ApiErrorResponse> {
  // Import NextResponse lazily to avoid issues in non-Next.js environments
  const { NextResponse: NR } = require('next/server');

  // Use core function to create error response object
  const errorResponse = createErrorResponseObject({ error, code, status, details });

  return NR.json(errorResponse, { status });
}

/**
 * Map custom errors to API responses
 */
export function mapErrorToApiResponse(error: unknown): {
  response: ApiErrorResponse;
  status: number;
} {
  // Custom application errors
  if (error instanceof InsufficientCreditsError) {
    return createApiErrorResponse(
      error.message,
      ERROR_CODES.INSUFFICIENT_CREDITS,
      HTTP_STATUS.PAYMENT_REQUIRED,
      { required: error.required, available: error.available }
    );
  }

  if (error instanceof UnauthorizedError) {
    return createApiErrorResponse(
      error.message,
      ERROR_CODES.UNAUTHORIZED,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  if (error instanceof ForbiddenError) {
    return createApiErrorResponse(error.message, ERROR_CODES.FORBIDDEN, HTTP_STATUS.FORBIDDEN);
  }

  if (error instanceof NotFoundError) {
    return createApiErrorResponse(error.message, ERROR_CODES.NOT_FOUND, HTTP_STATUS.NOT_FOUND, {
      resource: error.resource,
      resourceId: error.resourceId,
    });
  }

  if (error instanceof RateLimitError) {
    return createApiErrorResponse(
      error.message,
      ERROR_CODES.RATE_LIMIT_EXCEEDED,
      HTTP_STATUS.TOO_MANY_REQUESTS,
      error.retryAfter ? { retryAfter: error.retryAfter } : undefined
    );
  }

  if (error instanceof ConflictError) {
    return createApiErrorResponse(
      error.message,
      'CONFLICT',
      HTTP_STATUS.CONFLICT,
      error.details as Record<string, unknown>
    );
  }

  if (error instanceof ValidationError) {
    return createApiErrorResponse(
      error.message,
      ERROR_CODES.VALIDATION_ERROR,
      HTTP_STATUS.BAD_REQUEST,
      error.details as Record<string, unknown>
    );
  }

  if (error instanceof AppError) {
    return createApiErrorResponse(
      error.message,
      error.code,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error.details as Record<string, unknown>
    );
  }

  // Zod validation errors
  if (isZodError(error)) {
    return createApiErrorResponse(
      'Dati di input non validi',
      ERROR_CODES.VALIDATION_ERROR,
      HTTP_STATUS.BAD_REQUEST,
      {
        zodIssues: error.issues,
        flattened: error.flatten(),
      }
    );
  }

  // Generic Error instance
  if (error instanceof Error) {
    const details = getErrorDetails(error);

    // Include stack trace only in development
    const errorDetails: Record<string, unknown> =
      process.env.NODE_ENV === 'development'
        ? {
          name: details.name,
          stack: details.stack,
          code: details.code,
          meta: details.meta,
        }
        : {};

    return createApiErrorResponse(
      error.message,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorDetails
    );
  }

  // Unknown error
  return createApiErrorResponse(
    'Errore sconosciuto',
    'UNKNOWN_ERROR',
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}

/**
 * Generic error handler for API routes.
 *
 * Handles AuthError (duck-typed via `toResponse()`), Zod errors,
 * custom AppError subclasses, and unknown errors — all in one call.
 *
 * @param error - The caught error
 * @param context - Optional logging context (e.g. '[TASKS_POST]')
 *
 * @example
 * try {
 *   const user = await requireAuthOrThrow();
 *   // ...business logic
 * } catch (error: unknown) {
 *   return handleRouteError(error, '[TASKS_POST]');
 * }
 */
export function handleRouteError(error: unknown, context?: string): NextResponse<ApiErrorResponse> {
  // Duck-type: errors with toResponse() (e.g. AuthError) handle themselves
  if (
    error != null &&
    typeof error === 'object' &&
    'toResponse' in error &&
    typeof (error as { toResponse: unknown }).toResponse === 'function'
  ) {
    return (error as { toResponse(): NextResponse<ApiErrorResponse> }).toResponse();
  }

  // Log with context if provided
  if (context) {
    const { logError: le } = require('../logger');
    le(context, error instanceof Error ? error : undefined);
  }

  const { response, status } = mapErrorToApiResponse(error);

  const { NextResponse: NR } = require('next/server');
  return NR.json(response, { status });
}
