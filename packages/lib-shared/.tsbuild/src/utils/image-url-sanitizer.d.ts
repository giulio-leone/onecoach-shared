/**
 * Image URL Sanitizer
 *
 * Rimuove URL non validi o non configurati (come via.placeholder.com)
 * per evitare errori con Next.js Image component
 */
/**
 * Sanitizza un imageUrl rimuovendo domini non configurati o non validi
 * @param imageUrl - URL dell'immagine da sanitizzare
 * @returns URL sanitizzato o null se non valido
 */
export declare function sanitizeImageUrl(imageUrl: string | null | undefined): string | null;
/**
 * Verifica se un imageUrl è valido per Next.js Image component
 * @param imageUrl - URL dell'immagine da verificare
 * @returns true se valido, false altrimenti
 */
export declare function isValidImageUrl(imageUrl: string | null | undefined): boolean;
//# sourceMappingURL=image-url-sanitizer.d.ts.map