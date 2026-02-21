/**
 * Date Utilities
 *
 * Funzioni per manipolazione date
 */
/**
 * Ottiene timestamp corrente in formato ISO
 */
export function getCurrentTimestamp() {
    return new Date().toISOString();
}
/**
 * Aggiunge giorni a una data
 */
export function addDays(date, days) {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
/**
 * Sottrae giorni da una data
 */
export function subtractDays(date, days) {
    return addDays(date, -days);
}
/**
 * Calcola differenza in giorni tra due date
 */
export function getDaysDifference(date1, date2) {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
/**
 * Verifica se una data è nel passato
 */
export function isPast(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d < new Date();
}
/**
 * Verifica se una data è nel futuro
 */
export function isFuture(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d > new Date();
}
/**
 * Ottiene inizio giornata (00:00:00)
 */
export function startOfDay(date) {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}
/**
 * Ottiene fine giornata (23:59:59)
 */
export function endOfDay(date) {
    const d = typeof date === 'string' ? new Date(date) : new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
}
/**
 * Formatta data in YYYY-MM-DD
 */
export function formatDateISO(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const isoString = d.toISOString();
    const datePart = isoString.split('T')[0];
    if (!datePart) {
        throw new Error('Failed to format date to ISO format');
    }
    return datePart;
}
