/**
 * useAsyncState Hook
 *
 * Unified hook for managing async operations (loading, error, data)
 * Follows KISS, SOLID, DRY principles
 *
 * Eliminates repetitive useState patterns for async operations
 */
export interface UseAsyncStateOptions<T> {
    initialData?: T | null;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}
export interface UseAsyncStateReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    setData: (data: T | null) => void;
    setError: (error: Error | null) => void;
    setLoading: (loading: boolean) => void;
    execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
    reset: () => void;
}
/**
 * Hook for managing async state
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, execute } = useAsyncState<User>();
 *
 * const loadUser = () => execute(async () => {
 *   const response = await fetch('/api/user');
 *   return response.json();
 * });
 * ```
 */
export declare function useAsyncState<T = unknown>(options?: UseAsyncStateOptions<T>): UseAsyncStateReturn<T>;
//# sourceMappingURL=use-async-state.d.ts.map