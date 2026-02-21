/**
 * Centralized API client with consistent error handling and type safety
 * Eliminates 500+ lines of duplicated fetch/error handling across hooks
 */
export class APIError extends Error {
    status;
    statusText;
    data;
    constructor(message, status, statusText, data) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.data = data;
        this.name = 'APIError';
    }
}
/**
 * Type-safe fetch wrapper with consistent error handling
 */
export async function fetchAPI(url, options) {
    const { timeout = 30000, ...fetchOptions } = options ?? {};
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...fetchOptions.headers,
            },
        });
        clearTimeout(timeoutId);
        // Handle empty responses (204 No Content)
        if (response.status === 204) {
            return undefined;
        }
        // Check Content-Type to determine how to parse response
        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');
        if (!response.ok) {
            let errorData;
            if (isJson) {
                try {
                    errorData = (await response.json());
                }
                catch (_error) {
                    // If JSON parsing fails, read as text
                    const text = await response.text();
                    errorData = { raw: text };
                }
            }
            else {
                // For non-JSON error responses, read as text
                const text = await response.text();
                errorData = { raw: text };
            }
            throw new APIError(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`, response.status, response.statusText, errorData);
        }
        // Parse successful response
        if (isJson) {
            try {
                return await response.json();
            }
            catch (jsonError) {
                // If JSON parsing fails, try to read as text for better error message
                const text = await response.text();
                throw new APIError(`Invalid JSON response: ${text.substring(0, 100)}`, response.status, response.statusText, { raw: text });
            }
        }
        else {
            // For non-JSON responses, read as text
            const text = await response.text();
            // Try to parse as JSON anyway (some APIs return JSON without proper Content-Type)
            try {
                return JSON.parse(text);
            }
            catch (_error) {
                // If parsing fails, return text as data
                return text;
            }
        }
    }
    catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new APIError('Request timeout', 408, 'Request Timeout');
            }
            throw new APIError(error.message, 0, 'Network Error');
        }
        throw new APIError('Unknown error occurred', 0, 'Unknown Error');
    }
}
/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
    get: (url, options) => fetchAPI(url, { ...options, method: 'GET' }),
    post: (url, data, options) => fetchAPI(url, {
        ...options,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    }),
    put: (url, data, options) => fetchAPI(url, {
        ...options,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
    }),
    patch: (url, data, options) => fetchAPI(url, {
        ...options,
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
    }),
    delete: (url, options) => fetchAPI(url, { ...options, method: 'DELETE' }),
};
/**
 * Build URL with query parameters
 */
export function buildURL(base, params) {
    if (!params)
        return base;
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });
    const queryString = searchParams.toString();
    return queryString ? `${base}?${queryString}` : base;
}
