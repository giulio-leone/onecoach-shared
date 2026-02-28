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
export async function handleApiError(response: Response): Promise<Error> {
  let errorMessage = 'Errore nella richiesta';

  try {
    const errorData = (await response.json()) as ApiErrorResponse;
    errorMessage = errorData.error || errorData.message || errorMessage;
  } catch (error: unknown) {
    // If JSON parsing fails, use status text
    errorMessage = response.statusText || `Errore ${response.status}`;
  }

  // Add context based on status code
  switch (response.status) {
    case 401:
      errorMessage = 'Sessione scaduta. Per favore, effettua il login di nuovo.';
      break;
    case 403:
      errorMessage = errorMessage || 'Non hai i permessi per questa operazione.';
      break;
    case 404:
      errorMessage = errorMessage || 'Risorsa non trovata.';
      break;
    case 500:
      errorMessage = 'Errore del server. Riprova più tardi.';
      break;
  }

  const error = new Error(errorMessage);
  (error as Error & { status?: number }).status = response.status;
  return error;
}

// getErrorMessage SSOT is in ./error/core — re-export for backward compatibility
export { getErrorMessage } from './error/core';
