/**
 * Platform Detection Utilities - React Native
 *
 * React Native specific implementations
 */
/**
 * Check platform OS
 */
export declare const isIOS: boolean;
export declare const isAndroid: boolean;
/**
 * Not applicable on React Native
 */
export declare function hasAPI(_apiName: string): boolean;
/**
 * Not applicable on React Native
 */
export declare function getWindow(): undefined;
/**
 * Not applicable on React Native
 */
export declare function getDocument(): undefined;
/**
 * Not applicable on React Native (use AsyncStorage instead)
 */
export declare function getLocalStorage(): null;
/**
 * Not applicable on React Native
 */
export declare function getSessionStorage(): null;
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
//# sourceMappingURL=platform.native.d.ts.map