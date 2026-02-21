/**
 * API Error Handler
 *
 * Centralized error handling for API responses
 * Follows DRY principle - eliminates duplicate error handling code
 */
/**
 * Handle API error response
 *
 * Extracts error message from response in a consistent way
 *
 * @param response - Fetch Response object
 * @returns Error with appropriate message
 */
export async function handleApiError(response) {
    let errorMessage = 'Errore nella richiesta';
    try {
        const errorData = (await response.json());
        errorMessage = errorData.error || errorData.message || errorMessage;
    }
    catch (error) {
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
    error.status = response.status;
    return error;
}
/**
 * Extract error message from unknown error
 *
 * @param error - Unknown error (Error, string, object, etc.)
 * @returns Error message string
 */
export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'Errore sconosciuto';
}
