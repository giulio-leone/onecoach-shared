/**
 * API Service
 *
 * Wrapper per fetch con retry logic, timeout e error handling
 * Implementa SRP (Single Responsibility Principle)
 */
/**
 * Default options
 */
const DEFAULT_OPTIONS = {
    timeout: 30000, // 30 secondi
    retries: 3,
    retryDelay: 1000, // 1 secondo
};
/**
 * Implementazione API Service
 */
class ApiService {
    /**
     * GET request
     */
    async get(url, options) {
        return this.request(url, 'GET', undefined, options);
    }
    /**
     * POST request
     */
    async post(url, data, options) {
        return this.request(url, 'POST', data, options);
    }
    /**
     * PUT request
     */
    async put(url, data, options) {
        return this.request(url, 'PUT', data, options);
    }
    /**
     * DELETE request
     */
    async delete(url, options) {
        return this.request(url, 'DELETE', undefined, options);
    }
    /**
     * Generic request con retry logic
     */
    async request(url, method, data, options) {
        const opts = { ...DEFAULT_OPTIONS, ...options };
        let lastError = null;
        for (let attempt = 0; attempt <= opts.retries; attempt++) {
            try {
                const response = await this.fetchWithTimeout(url, method, data, opts);
                return response;
            }
            catch (error) {
                lastError = error;
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
    async fetchWithTimeout(url, method, data, options) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), options?.timeout || DEFAULT_OPTIONS.timeout);
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
            let result;
            if (isJson) {
                try {
                    result = (await response.json());
                }
                catch (jsonError) {
                    const text = await response.text();
                    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
                }
            }
            else {
                const text = await response.text();
                if (!response.ok) {
                    return {
                        success: false,
                        error: `HTTP ${response.status}: ${text.substring(0, 200)}`,
                    };
                }
                try {
                    result = JSON.parse(text);
                }
                catch (_error) {
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
                data: (result.data !== undefined ? result.data : result),
                message: result.message,
            };
        }
        catch (error) {
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
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
/**
 * Singleton instance
 */
export const apiService = new ApiService();
