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
export function kgToLbs(kg) {
    // Defensive: gestisci null, undefined, NaN e valori negativi
    if (kg === null || kg === undefined || Number.isNaN(kg) || kg < 0) {
        return 0;
    }
    return kg * 2.20462;
}
/**
 * Converte libbre in chilogrammi
 * Gestisce gracefully valori nulli, undefined, NaN o negativi ritornando 0
 * @param lbs - Peso in libbre
 * @returns Peso in chilogrammi (0 se input invalido)
 */
export function lbsToKg(lbs) {
    // Defensive: gestisci null, undefined, NaN e valori negativi
    if (lbs === null || lbs === undefined || Number.isNaN(lbs) || lbs < 0) {
        return 0;
    }
    return lbs / 2.20462;
}
/**
 * Formatta il peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, calcolato se non fornito)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Stringa formattata con valore e unità
 */
export function formatWeightByUnit(weightKg, weightLbs, unit) {
    if (weightKg === null || weightKg === undefined) {
        return 'N/A';
    }
    if (unit === 'LBS') {
        const lbs = weightLbs !== null && weightLbs !== undefined ? weightLbs : (weightKg >= 0 ? kgToLbs(weightKg) : 0);
        return `${lbs.toFixed(1)} lbs`;
    }
    return `${weightKg.toFixed(1)} kg`;
}
/**
 * Ottiene il valore del peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, può essere null)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Valore del peso nell'unità richiesta
 */
export function getWeightValue(weightKg, weightLbs, unit) {
    if (weightKg === undefined || weightKg === null) {
        return undefined;
    }
    if (unit === 'LBS') {
        return weightLbs !== null && weightLbs !== undefined ? weightLbs : (weightKg >= 0 ? kgToLbs(weightKg) : 0);
    }
    return weightKg;
}
// Note: kgToLbs and lbsToKg are already exported above
/**
 * Sincronizza peso in kg e lbs, assicurando che entrambi siano sempre presenti
 * Se manca uno dei due, lo calcola dall'altro
 * @param weightKg - Peso in chilogrammi (opzionale)
 * @param weightLbs - Peso in libbre (opzionale)
 * @returns Oggetto con weightKg e weightLbs sempre sincronizzati
 */
export function syncWeightUnits(weightKg, weightLbs) {
    // Se non abbiamo nessuno dei due valori, ritorna null
    if (!weightKg && !weightLbs) {
        return null;
    }
    let finalWeightKg;
    let finalWeightLbs;
    if (weightKg !== undefined && weightKg !== null && weightKg > 0) {
        // Abbiamo kg, usa quello come fonte di verità
        finalWeightKg = weightKg;
        finalWeightLbs = kgToLbs(weightKg);
    }
    else if (weightLbs !== undefined && weightLbs !== null && weightLbs > 0) {
        // Abbiamo solo lbs, converti in kg
        finalWeightKg = lbsToKg(weightLbs);
        finalWeightLbs = weightLbs;
    }
    else {
        // Valori non validi
        return null;
    }
    return {
        weightKg: finalWeightKg,
        weightLbs: finalWeightLbs,
    };
}
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
export function roundToPlateIncrement(weight, increment = 2.5, maxDecimals = 2) {
    // Defensive: handle null, undefined, NaN, or zero
    if (weight === null || weight === undefined || Number.isNaN(weight) || weight === 0) {
        return 0;
    }
    // Ensure increment is valid (positive, non-zero)
    if (increment <= 0 || Number.isNaN(increment)) {
        increment = 2.5;
    }
    // Round to nearest increment
    const rounded = Math.round(weight / increment) * increment;
    // Apply max decimals to avoid floating point precision issues
    const factor = Math.pow(10, maxDecimals);
    return Math.round(rounded * factor) / factor;
}
