/**
 * Type Guards
 *
 * Utility type guards for runtime type checking
 */
/**
 * Type guard per verificare se un valore è un Error
 */
export declare function isError(error: unknown): error is Error;
/**
 * Type guard per verificare se un valore è un oggetto
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;
/**
 * Type guard per verificare se un valore è una stringa
 */
export declare function isString(value: unknown): value is string;
/**
 * Type guard per verificare se un valore è un numero
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Type guard per verificare se un valore è un array
 */
export declare function isArray<T>(value: unknown): value is T[];
/**
 * Type guard per verificare se un oggetto ha una proprietà specifica
 */
export declare function hasProperty<K extends string>(obj: unknown, prop: K): obj is Record<K, unknown>;
/**
 * Type guard per verificare se un errore ha un messaggio
 */
export declare function isErrorWithMessage(error: unknown): error is Error & {
    message: string;
};
/**
 * Type guard per verificare se un errore ha un codice
 */
export declare function isErrorWithCode(error: unknown): error is Error & {
    code: string | number;
};
//# sourceMappingURL=type-guards.d.ts.map