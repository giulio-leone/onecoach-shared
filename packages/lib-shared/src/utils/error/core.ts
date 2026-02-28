/**
 * Core Error Handling Utilities
 *
 * Provides type-safe error handling with strong typing and explicit contracts.
 * Following: Strong Typing First, Explicit > Implicit, Functional Core
 */

import { z } from 'zod';

/**
 * Prisma error interface (not importing from @prisma/client to avoid dependency)
 */
export interface PrismaError {
  code: string;
  meta?: Record<string, unknown>;
  message: string;
  clientVersion?: string;
}

/**
 * Type guard: Error instance
 *
 * @example
 * if (isError(error)) {
 *   console.warn(error.message);
 * }
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Type guard: Zod validation error
 */
export function isZodError(value: unknown): value is z.ZodError {
  return value instanceof z.ZodError;
}

/**
 * Type guard: Prisma client error
 */
export function isPrismaError(value: unknown): value is PrismaError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    typeof (value as { code: unknown }).code === 'string' &&
    'name' in value &&
    (value as { name: unknown }).name === 'PrismaClientKnownRequestError'
  );
}

/**
 * Type guard: Check if error is retryable
 *
 * Network errors, timeouts, rate limits, and 5xx errors are retryable.
 */
export function isRetryableError(error: unknown): boolean {
  if (!isError(error)) return false;

  const message = error.message.toLowerCase();

  // Network errors
  if (
    message.includes('network') ||
    message.includes('timeout') ||
    message.includes('econnreset') ||
    message.includes('enotfound')
  ) {
    return true;
  }

  // Rate limit errors
  if (message.includes('rate limit') || message.includes('429')) {
    return true;
  }

  // Server errors (5xx)
  if (
    message.includes('500') ||
    message.includes('502') ||
    message.includes('503') ||
    message.includes('504')
  ) {
    return true;
  }

  return false;
}

/**
 * Extract error message with type safety
 *
 * @param error - Unknown error value
 * @param fallback - Fallback message (default: 'Errore sconosciuto')
 * @returns Error message string
 */
export function getErrorMessage(error: unknown, fallback = 'Errore sconosciuto'): string {
  if (isError(error)) {
    return error.message;
  }
  if (isZodError(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message: unknown }).message === 'string') {
    return (error as { message: string }).message;
  }
  return fallback;
}

/**
 * Structured error details for logging and debugging
 */
export interface ErrorDetails {
  readonly message: string;
  readonly name?: string;
  readonly stack?: string;
  readonly code?: string;
  readonly meta?: Record<string, unknown>;
  readonly zodIssues?: z.ZodIssue[];
  readonly prismaCode?: string;
}

/**
 * Extract detailed error information
 *
 * @param error - Unknown error value
 * @returns Structured error details
 */
export function getErrorDetails(error: unknown): ErrorDetails {
  const details: ErrorDetails = {
    message: getErrorMessage(error),
  };

  if (isError(error)) {
    return {
      ...details,
      name: error.name,
      stack: error.stack,
    };
  }

  if (isZodError(error)) {
    return {
      ...details,
      name: 'ZodError',
      zodIssues: error.issues,
    };
  }

  if (isPrismaError(error)) {
    return {
      ...details,
      name: 'PrismaError',
      prismaCode: error.code,
      code: error.code,
      meta: error.meta as Record<string, unknown>,
    };
  }

  return details;
}
