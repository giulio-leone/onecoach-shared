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
export declare function normalizeUrl(url: unknown): string | undefined;
//# sourceMappingURL=url-normalizer.d.ts.map