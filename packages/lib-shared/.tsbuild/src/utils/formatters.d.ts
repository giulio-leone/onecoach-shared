/**
 * Formatter Utilities
 *
 * Funzioni per formattare dati (calorie, macros, date, numeri)
 */
import type { Macros } from '@onecoach/types';
/**
 * Formatta calorie con unità
 *
 * @param calories - Numero di calorie
 * @returns Stringa formattata
 *
 * @example
 * formatCalories(2500) // '2,500 kcal'
 */
export declare function formatCalories(calories: number): string;
/**
 * Formatta macronutrienti
 *
 * @param macros - Oggetto macros
 * @returns Stringa formattata
 *
 * @example
 * formatMacros({ protein: 150, carbs: 200, fats: 60 })
 * // 'P: 150g | C: 200g | G: 60g'
 */
export declare function formatMacros(macros: Partial<Macros>): string;
/**
 * Formatta durata in minuti
 *
 * @param minutes - Durata in minuti
 * @returns Stringa formattata
 *
 * @example
 * formatDuration(90) // '1h 30m'
 * formatDuration(45) // '45m'
 */
export declare function formatDuration(minutes: number): string;
/**
 * Formatta data in formato italiano
 *
 * @param date - Data (string ISO o Date)
 * @returns Data formattata
 *
 * @example
 * formatDate('2025-10-26') // '26/10/2025'
 */
export declare function formatDate(date: string | Date): string;
/**
 * Formatta data con ora
 *
 * @param date - Data (string ISO o Date)
 * @returns Data e ora formattate
 *
 * @example
 * formatDateTime('2025-10-26T14:30:00') // '26/10/2025, 14:30'
 */
export declare function formatDateTime(date: string | Date): string;
/**
 * Formatta peso
 *
 * @param weight - Peso in kg
 * @returns Peso formattato
 *
 * @example
 * formatWeight(75.5) // '75.5 kg'
 */
export declare function formatWeight(weight: number): string;
/**
 * Formatta numero con decimali
 *
 * @param value - Valore numerico
 * @param decimals - Numero di decimali (default: 1)
 * @returns Numero formattato
 *
 * @example
 * formatNumber(123.456) // '123.5'
 * formatNumber(123.456, 2) // '123.46'
 */
export declare function formatNumber(value: number, decimals?: number): string;
/**
 * Converte una stringa in uno slug URL-friendly
 *
 * @param value - Testo di input
 * @returns Slug normalizzato
 */
export declare function toSlug(value: string): string;
//# sourceMappingURL=formatters.d.ts.map