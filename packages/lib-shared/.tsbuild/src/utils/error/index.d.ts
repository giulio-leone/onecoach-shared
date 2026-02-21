/**
 * Centralized Error Handling System
 *
 * Unified error handling for the entire application.
 * Consolidates error-handler.ts, api/error-handler.ts, and ai/agent/utils/error-handler.ts
 *
 * Architecture:
 * - core.ts: Type guards and error extraction
 * - custom-errors.ts: Domain-specific error classes
 * - api.ts: API response formatting
 * - utils.ts: Functional wrappers (retry, timeout, safe)
 *
 * Following principles:
 * - SOLID (SRP, DIP)
 * - DRY (single source of truth)
 * - Strong Typing First
 * - Separation of Concerns
 * - Functional Core / Imperative Shell
 * - Explicit > Implicit
 */
export { isError, isZodError, isPrismaError, isRetryableError, getErrorMessage, getErrorDetails, type ErrorDetails, } from './core';
export { AppError, ValidationError, TimeoutError, ModelError, InsufficientCreditsError, UnauthorizedError, ForbiddenError, NotFoundError, RateLimitError, ConflictError, } from './custom-errors';
export { createApiErrorResponse, createNextErrorResponse, mapErrorToApiResponse, handleApiError, type ApiErrorResponse, } from './api';
export { safeAsync, retryAsync, withTimeout, withTimeoutAndRetry, type Result, type RetryOptions, } from './utils';
export { logError } from '../logger';
//# sourceMappingURL=index.d.ts.map