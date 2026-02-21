/**
 * Error Handling Utility Functions
 *
 * Functional wrappers for async operations with error handling.
 * Following: Functional Core, Avoid Side Effects, Idempotency, Fail Fast
 */
/**
 * Result type for safe async operations
 */
export type Result<T, E = string> = {
    readonly ok: true;
    readonly value: T;
} | {
    readonly ok: false;
    readonly error: E;
};
/**
 * Safe async wrapper that returns Result instead of throwing
 *
 * Pure functional approach to error handling.
 *
 * @example
 * const result = await safeAsync(() => fetchUser(id));
 * if (result.ok) {
 *   console.warn(result.value);
 * } else {
 *   console.error(result.error);
 * }
 */
export declare function safeAsync<T>(fn: () => Promise<T>, errorMessage?: string): Promise<Result<T, string>>;
/**
 * Retry configuration options
 */
export interface RetryOptions {
    readonly maxRetries?: number;
    readonly initialDelay?: number;
    readonly maxDelay?: number;
    readonly backoffFactor?: number;
    readonly shouldRetry?: (error: unknown) => boolean;
}
/**
 * Retry async function with exponential backoff
 *
 * @example
 * const data = await retryAsync(
 *   () => fetchData(),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 */
export declare function retryAsync<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>;
/**
 * Wrap promise with timeout
 *
 * @example
 * const data = await withTimeout(
 *   fetchData(),
 *   5000,
 *   'Fetch timed out'
 * );
 */
export declare function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMessage?: string): Promise<T>;
/**
 * Combine timeout and retry
 *
 * @example
 * const data = await withTimeoutAndRetry(
 *   () => fetchData(),
 *   5000,
 *   { maxRetries: 3 }
 * );
 */
export declare function withTimeoutAndRetry<T>(fn: () => Promise<T>, timeoutMs: number, retryOptions?: RetryOptions): Promise<T>;
//# sourceMappingURL=utils.d.ts.map