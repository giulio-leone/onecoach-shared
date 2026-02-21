/**
 * Request Deduplication Utility
 *
 * Prevents duplicate requests by tracking in-flight requests at module level.
 * Works even in React Strict Mode where components mount/unmount/remount.
 *
 * Usage:
 * ```ts
 * const response = await deduplicateRequest(
 *   '/api/agents/main',
 *   () => fetch('/api/agents/main', { method: 'POST', body: ... })
 * );
 * ```
 */
/**
 * Deduplicate a request
 *
 * If a request with the same endpoint and params is already in flight,
 * returns the existing promise instead of making a new request.
 *
 * @param endpoint - The API endpoint (used for key generation)
 * @param requestFn - Function that makes the actual request
 * @param params - Optional params to include in the deduplication key
 * @returns Promise that resolves/rejects with the request result
 */
export declare function deduplicateRequest<T>(endpoint: string, requestFn: (signal: AbortSignal) => Promise<T>, params?: unknown): Promise<T>;
/**
 * Cancel a pending request by endpoint and params
 *
 * @param endpoint - The API endpoint
 * @param params - Optional params to match
 * @returns true if a request was cancelled, false otherwise
 */
export declare function cancelRequest(endpoint: string, params?: unknown): boolean;
/**
 * Clear all pending requests
 * Useful for cleanup or testing
 */
export declare function clearAllRequests(): void;
/**
 * Get count of pending requests
 * Useful for debugging
 */
export declare function getPendingRequestCount(): number;
//# sourceMappingURL=request-deduplication.d.ts.map