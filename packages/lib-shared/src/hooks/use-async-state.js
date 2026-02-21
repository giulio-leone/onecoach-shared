/**
 * useAsyncState Hook
 *
 * Unified hook for managing async operations (loading, error, data)
 * Follows KISS, SOLID, DRY principles
 *
 * Eliminates repetitive useState patterns for async operations
 */
'use client';
import { useState, useCallback } from 'react';
import { getErrorMessage } from '@onecoach/lib-shared/utils/api-error-handler';
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
export function useAsyncState(options = {}) {
    const { initialData = null, onSuccess, onError } = options;
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const execute = useCallback(async (asyncFn) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await asyncFn();
            setData(result);
            onSuccess?.(result);
            return result;
        }
        catch (err) {
            const errorMessage = getErrorMessage(err);
            const error = new Error(errorMessage);
            setError(error);
            onError?.(error);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, [onSuccess, onError]);
    const reset = useCallback(() => {
        setData(initialData);
        setError(null);
        setIsLoading(false);
    }, [initialData]);
    return {
        data,
        isLoading,
        error,
        setData,
        setError,
        setLoading: setIsLoading,
        execute,
        reset,
    };
}
