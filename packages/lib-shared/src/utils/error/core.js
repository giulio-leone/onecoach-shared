/**
 * Core Error Handling Utilities
 *
 * Provides type-safe error handling with strong typing and explicit contracts.
 * Following: Strong Typing First, Explicit > Implicit, Functional Core
 */
import { z } from 'zod';
/**
 * Type guard: Error instance
 *
 * @example
 * if (isError(error)) {
 *   console.warn(error.message);
 * }
 */
export function isError(value) {
    return value instanceof Error;
}
/**
 * Type guard: Zod validation error
 */
export function isZodError(value) {
    return value instanceof z.ZodError;
}
/**
 * Type guard: Prisma client error
 */
export function isPrismaError(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'code' in value &&
        typeof value.code === 'string' &&
        'name' in value &&
        value.name === 'PrismaClientKnownRequestError');
}
/**
 * Type guard: Check if error is retryable
 *
 * Network errors, timeouts, rate limits, and 5xx errors are retryable.
 */
export function isRetryableError(error) {
    if (!isError(error))
        return false;
    const message = error.message.toLowerCase();
    // Network errors
    if (message.includes('network') ||
        message.includes('timeout') ||
        message.includes('econnreset') ||
        message.includes('enotfound')) {
        return true;
    }
    // Rate limit errors
    if (message.includes('rate limit') || message.includes('429')) {
        return true;
    }
    // Server errors (5xx)
    if (message.includes('500') ||
        message.includes('502') ||
        message.includes('503') ||
        message.includes('504')) {
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
export function getErrorMessage(error, fallback = 'Errore sconosciuto') {
    if (isError(error)) {
        return error.message;
    }
    if (isZodError(error)) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return fallback;
}
/**
 * Extract detailed error information
 *
 * @param error - Unknown error value
 * @returns Structured error details
 */
export function getErrorDetails(error) {
    const details = {
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
            meta: error.meta,
        };
    }
    return details;
}
