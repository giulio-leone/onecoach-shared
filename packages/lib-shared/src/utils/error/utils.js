/**
 * Error Handling Utility Functions
 *
 * Functional wrappers for async operations with error handling.
 * Following: Functional Core, Avoid Side Effects, Idempotency, Fail Fast
 */
import { TimeoutError, AppError } from './custom-errors';
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
export async function safeAsync(fn, errorMessage = 'Operazione fallita') {
    try {
        const value = await fn();
        return { ok: true, value };
    }
    catch (error) {
        const message = error instanceof Error ? `${errorMessage}: ${error.message}` : errorMessage;
        return { ok: false, error: message };
    }
}
const DEFAULT_RETRY_OPTIONS = {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
    shouldRetry: () => true,
};
/**
 * Retry async function with exponential backoff
 *
 * @example
 * const data = await retryAsync(
 *   () => fetchData(),
 *   { maxRetries: 3, initialDelay: 1000 }
 * );
 */
export async function retryAsync(fn, options = {}) {
    const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
    const { maxRetries, initialDelay, maxDelay, backoffFactor, shouldRetry } = opts;
    let lastError;
    let delay = initialDelay;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));
            // Check if we should retry this error
            if (!shouldRetry(error)) {
                throw lastError;
            }
            // Last attempt failed
            if (attempt === maxRetries) {
                throw new AppError(`Operazione fallita dopo ${maxRetries} tentativi: ${lastError.message}`, 'MAX_RETRIES_EXCEEDED', { attempts: maxRetries + 1, lastError: lastError.message });
            }
            // Wait before retrying (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay = Math.min(delay * backoffFactor, maxDelay);
        }
    }
    // This should never be reached, but TypeScript needs it
    throw lastError;
}
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
export async function withTimeout(promise, timeoutMs, errorMessage = 'Operazione scaduta') {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new TimeoutError(errorMessage, timeoutMs)), timeoutMs)),
    ]);
}
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
export async function withTimeoutAndRetry(fn, timeoutMs, retryOptions = {}) {
    return retryAsync(() => withTimeout(fn(), timeoutMs), retryOptions);
}
