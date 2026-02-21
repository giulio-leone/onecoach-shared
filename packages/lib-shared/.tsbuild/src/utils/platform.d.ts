/**
 * Platform Detection Utilities
 *
 * Cross-platform utilities to detect environment and capabilities
 * Works on both web and React Native
 */
/**
 * Check if code is running on the server
 */
export declare const isServer: boolean;
/**
 * Check if code is running on the client
 */
export declare const isClient: boolean;
/**
 * Check if browser supports a specific API
 */
export declare function hasAPI(apiName: string): boolean;
/**
 * Safely access window object
 */
export declare function getWindow(): Window | undefined;
/**
 * Safely access document object
 */
export declare function getDocument(): Document | undefined;
/**
 * Safely access localStorage
 */
export declare function getLocalStorage(): Storage | null;
/**
 * Safely access sessionStorage
 */
export declare function getSessionStorage(): Storage | null;
/**
 * Check if running in development mode
 */
export declare const isDevelopment: boolean;
/**
 * Check if running in production mode
 */
export declare const isProduction: boolean;
/**
 * Check if running in test mode
 */
export declare const isTest: boolean;
/**
 * Platform-agnostic noop function
 */
export declare const noop: () => void;
/**
 * Platform-agnostic delay function
 */
export declare const delay: (ms: number) => Promise<void>;
/**
 * Safely parse JSON with fallback
 */
export declare function safeJSONParse<T>(json: string, fallback: T): T;
/**
 * Safely stringify JSON with fallback
 */
export declare function safeJSONStringify<T>(value: T, fallback?: string): string;
/**
 * Deep clone an object
 * Uses structuredClone when available (faster and more accurate)
 * Falls back to JSON.parse/stringify for compatibility
 *
 * Note: structuredClone supports:
 * - Dates, Maps, Sets, RegExp
 * - Typed arrays, ArrayBuffers
 * - Circular references
 * - Error objects (partially)
 *
 * Does NOT support:
 * - Functions
 * - Symbols
 * - DOM nodes
 */
export declare function deepClone<T>(value: T): T;
//# sourceMappingURL=platform.d.ts.map