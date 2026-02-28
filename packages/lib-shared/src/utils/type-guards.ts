/**
 * Type Guards
 *
 * Utility type guards for runtime type checking
 */

// isError is the SSOT in ./error/core — import for local use and re-export for backward compatibility
import { isError } from './error/core';
export { isError };

/**
 * Type guard per verificare se un valore è un oggetto
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard per verificare se un valore è una stringa
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Type guard per verificare se un valore è un numero
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * Type guard per verificare se un valore è un array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Type guard per verificare se un oggetto ha una proprietà specifica
 */
export function hasProperty<K extends string>(obj: unknown, prop: K): obj is Record<K, unknown> {
  return isObject(obj) && prop in obj;
}

/**
 * Type guard per verificare se un errore ha un messaggio
 */
export function isErrorWithMessage(error: unknown): error is Error & { message: string } {
  return isError(error) && isString(error.message);
}

/**
 * Type guard per verificare se un errore ha un codice
 */
export function isErrorWithCode(error: unknown): error is Error & { code: string | number } {
  return isError(error) && ('code' in error || 'statusCode' in error);
}
