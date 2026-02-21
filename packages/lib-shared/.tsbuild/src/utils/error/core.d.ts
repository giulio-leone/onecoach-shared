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
export declare function isError(value: unknown): value is Error;
/**
 * Type guard: Zod validation error
 */
export declare function isZodError(value: unknown): value is z.ZodError;
/**
 * Type guard: Prisma client error
 */
export declare function isPrismaError(value: unknown): value is PrismaError;
/**
 * Type guard: Check if error is retryable
 *
 * Network errors, timeouts, rate limits, and 5xx errors are retryable.
 */
export declare function isRetryableError(error: unknown): boolean;
/**
 * Extract error message with type safety
 *
 * @param error - Unknown error value
 * @param fallback - Fallback message (default: 'Errore sconosciuto')
 * @returns Error message string
 */
export declare function getErrorMessage(error: unknown, fallback?: string): string;
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
export declare function getErrorDetails(error: unknown): ErrorDetails;
//# sourceMappingURL=core.d.ts.map