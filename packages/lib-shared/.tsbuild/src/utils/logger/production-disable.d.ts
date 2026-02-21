/**
 * Production Console Disabler (Client-Side Only)
 *
 * Disattiva tutti i console.* in produzione SOLO lato client (browser).
 * I log lato server (Vercel) rimangono attivi per il debugging.
 *
 * IMPORTANTE: Questo file deve essere importato all'inizio dell'applicazione
 * per garantire che tutti i console.* vengano disattivati prima che qualsiasi
 * altro codice venga eseguito.
 *
 * Strategia:
 * - Client-side: Disattiva tutti i console.* in produzione (nessun log nel browser)
 * - Server-side: Mantiene tutti i log attivi (per Vercel console)
 */
/**
 * Disattiva tutti i console.* in produzione SOLO lato client
 * I log lato server rimangono attivi per Vercel console
 */
export declare function disableConsoleInProduction(): void;
//# sourceMappingURL=production-disable.d.ts.map