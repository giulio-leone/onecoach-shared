/**
 * Weight Converter Utilities
 *
 * Utility functions per conversione e formattazione pesi
 */
/**
 * Converte chilogrammi in libbre
 * Gestisce gracefully valori nulli, undefined, NaN o negativi ritornando 0
 * @param kg - Peso in chilogrammi
 * @returns Peso in libbre (0 se input invalido)
 */
export declare function kgToLbs(kg: number | null | undefined): number;
/**
 * Converte libbre in chilogrammi
 * Gestisce gracefully valori nulli, undefined, NaN o negativi ritornando 0
 * @param lbs - Peso in libbre
 * @returns Peso in chilogrammi (0 se input invalido)
 */
export declare function lbsToKg(lbs: number | null | undefined): number;
/**
 * Formatta il peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, calcolato se non fornito)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Stringa formattata con valore e unità
 */
export declare function formatWeightByUnit(weightKg: number | null, weightLbs: number | null | undefined, unit: 'KG' | 'LBS'): string;
/**
 * Ottiene il valore del peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, può essere null)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Valore del peso nell'unità richiesta
 */
export declare function getWeightValue(weightKg: number | null | undefined, weightLbs: number | null | undefined, unit: 'KG' | 'LBS'): number | undefined;
/**
 * Sincronizza peso in kg e lbs, assicurando che entrambi siano sempre presenti
 * Se manca uno dei due, lo calcola dall'altro
 * @param weightKg - Peso in chilogrammi (opzionale)
 * @param weightLbs - Peso in libbre (opzionale)
 * @returns Oggetto con weightKg e weightLbs sempre sincronizzati
 */
export declare function syncWeightUnits(weightKg?: number | null, weightLbs?: number | null): {
    weightKg?: number;
    weightLbs?: number;
} | null;
/**
 * Round weight to the nearest plate increment
 *
 * Common increments:
 * - 2.5kg: Standard Olympic barbell plates
 * - 2.0kg: Common dumbbell increments
 * - 1.25kg: Micro plates for fine progression
 *
 * @param weight - Weight in kg (or any unit)
 * @param increment - Plate increment (default 2.5)
 * @param maxDecimals - Maximum decimal places in output (default 2)
 * @returns Rounded weight to nearest increment, 0 stays 0
 *
 * @example
 * roundToPlateIncrement(67.3, 2.5) // → 67.5
 * roundToPlateIncrement(67.3, 2.0) // → 68.0
 * roundToPlateIncrement(0, 2.5)    // → 0
 */
export declare function roundToPlateIncrement(weight: number | null | undefined, increment?: number, maxDecimals?: number): number;
//# sourceMappingURL=weight-converter.d.ts.map