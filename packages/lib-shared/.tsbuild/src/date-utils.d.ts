/**
 * Date Utilities
 *
 * Funzioni per manipolazione date
 */
/**
 * Ottiene timestamp corrente in formato ISO
 */
export declare function getCurrentTimestamp(): string;
/**
 * Aggiunge giorni a una data
 */
export declare function addDays(date: Date | string, days: number): Date;
/**
 * Sottrae giorni da una data
 */
export declare function subtractDays(date: Date | string, days: number): Date;
/**
 * Calcola differenza in giorni tra due date
 */
export declare function getDaysDifference(date1: Date | string, date2: Date | string): number;
/**
 * Verifica se una data è nel passato
 */
export declare function isPast(date: Date | string): boolean;
/**
 * Verifica se una data è nel futuro
 */
export declare function isFuture(date: Date | string): boolean;
/**
 * Ottiene inizio giornata (00:00:00)
 */
export declare function startOfDay(date: Date | string): Date;
/**
 * Ottiene fine giornata (23:59:59)
 */
export declare function endOfDay(date: Date | string): Date;
/**
 * Formatta data in YYYY-MM-DD
 */
export declare function formatDateISO(date: Date | string): string;
//# sourceMappingURL=date-utils.d.ts.map