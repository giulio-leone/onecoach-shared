/**
 * API Service
 *
 * Wrapper per fetch con retry logic, timeout e error handling
 * Implementa SRP (Single Responsibility Principle)
 */
import type { ApiResponse } from '@onecoach/types';
/**
 * Interface per API Service
 */
export interface IApiService {
    get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
    post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>>;
    put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>>;
    delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>>;
}
/**
 * Opzioni per le richieste
 */
export interface RequestOptions {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
}
/**
 * Singleton instance
 */
export declare const apiService: IApiService;
//# sourceMappingURL=api.service.d.ts.map