/**
 * API Service
 *
 * Wrapper per fetch con retry logic, timeout e error handling
 * Implementa SRP (Single Responsibility Principle)
 */

import type { ApiResponse } from '@giulio-leone/types';

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
 * Default options
 */
const DEFAULT_OPTIONS: Required<Omit<RequestOptions, 'headers'>> = {
  timeout: 30000, // 30 secondi
  retries: 3,
  retryDelay: 1000, // 1 secondo
};

/**
 * Implementazione API Service
 */
class ApiService implements IApiService {
  /**
   * GET request
   */
  async get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'GET', undefined, options);
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'POST', data, options);
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'PUT', data, options);
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(url, 'DELETE', undefined, options);
  }

  /**
   * Generic request con retry logic
   */
  private async request<T>(
    url: string,
    method: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= opts.retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout<T>(url, method, data, opts);
        return response;
      } catch (error: unknown) {
        lastError = error as Error;

        // Non ritentare su errori 4xx (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          break;
        }

        // Attendi prima del prossimo tentativo
        if (attempt < opts.retries) {
          await this.delay(opts.retryDelay);
        }
      }
    }

    // Tutti i tentativi falliti
    return {
      success: false,
      error: lastError?.message || 'Request failed',
    };
  }

  /**
   * Fetch con timeout
   */
  private async fetchWithTimeout<T>(
    url: string,
    method: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      options?.timeout || DEFAULT_OPTIONS.timeout
    );

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      type ApiResult = {
        data?: unknown;
        error?: string;
        message?: string;
        [key: string]: unknown;
      };

      let result: ApiResult;

      if (isJson) {
        try {
          result = (await response.json()) as ApiResult;
        } catch (jsonError: unknown) {
          const text = await response.text();
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
        }
      } else {
        const text = await response.text();

        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${text.substring(0, 200)}`,
          };
        }

        try {
          result = JSON.parse(text) as ApiResult;
        } catch (_error: unknown) {
          result = { data: text };
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error: result.error || result.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data: (result.data !== undefined ? result.data : result) as T,
        message: result.message,
      };
    } catch (error: unknown) {
      clearTimeout(timeout);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }

      throw new Error('Unknown error');
    }
  }

  /**
   * Utility per delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Singleton instance
 */
export const apiService: IApiService = new ApiService();
