/**
 * URL Normalizer Utility
 *
 * Utility condivisa per normalizzazione URL:
 * - Rimuove URL vuoti, null, undefined
 * - Valida formato URL
 * - Ritorna undefined per URL invalidi
 *
 * Principi: KISS, SOLID (Single Responsibility), DRY
 */
/**
 * Normalizza un URL: valida e pulisce, rimuove invalid/empty
 *
 * @param url URL da normalizzare (può essere string, null, undefined, o altro)
 * @returns URL normalizzato o undefined se invalido/vuoto
 */
export function normalizeUrl(url) {
    // Rimuovi se null, undefined, o stringa vuota
    if (!url || url === '' || url === null || url === undefined) {
        return undefined;
    }
    // Converti a stringa se non lo è già
    const urlString = typeof url === 'string' ? url.trim() : String(url).trim();
    // Rimuovi se stringa vuota dopo trim
    if (urlString === '') {
        return undefined;
    }
    // Valida formato URL
    try {
        new URL(urlString);
        return urlString;
    }
    catch (_error) {
        // URL invalido, rimuovi
        return undefined;
    }
}
