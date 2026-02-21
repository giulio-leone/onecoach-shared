/**
 * Centralized API client with consistent error handling and type safety
 * Eliminates 500+ lines of duplicated fetch/error handling across hooks
 */
export declare class APIError extends Error {
    status: number;
    statusText: string;
    data?: unknown | undefined;
    constructor(message: string, status: number, statusText: string, data?: unknown | undefined);
}
export interface FetchOptions extends RequestInit {
    timeout?: number;
}
/**
 * Type-safe fetch wrapper with consistent error handling
 */
export declare function fetchAPI<T>(url: string, options?: FetchOptions): Promise<T>;
/**
 * Convenience methods for common HTTP verbs
 */
export declare const api: {
    get: <T>(url: string, options?: FetchOptions) => Promise<T>;
    post: <T>(url: string, data?: unknown, options?: FetchOptions) => Promise<T>;
    put: <T>(url: string, data?: unknown, options?: FetchOptions) => Promise<T>;
    patch: <T>(url: string, data?: unknown, options?: FetchOptions) => Promise<T>;
    delete: <T>(url: string, options?: FetchOptions) => Promise<T>;
};
/**
 * Build URL with query parameters
 */
export declare function buildURL(base: string, params?: Record<string, string | number | boolean | undefined | null>): string;
//# sourceMappingURL=api-client.d.ts.map