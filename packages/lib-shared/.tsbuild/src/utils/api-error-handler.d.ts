/**
 * API Error Handler
 *
 * Centralized error handling for API responses
 * Follows DRY principle - eliminates duplicate error handling code
 */
/**
 * Standard API error response
 */
export interface ApiErrorResponse {
    error: string;
    message?: string;
    code?: string;
}
/**
 * Handle API error response
 *
 * Extracts error message from response in a consistent way
 *
 * @param response - Fetch Response object
 * @returns Error with appropriate message
 */
export declare function handleApiError(response: Response): Promise<Error>;
/**
 * Extract error message from unknown error
 *
 * @param error - Unknown error (Error, string, object, etc.)
 * @returns Error message string
 */
export declare function getErrorMessage(error: unknown): string;
//# sourceMappingURL=api-error-handler.d.ts.map