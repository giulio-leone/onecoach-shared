/**
 * Core Logger Implementation
 *
 * Production-ready centralized logging system.
 * Following: Strong Typing First, SRP, DRY, Explicit > Implicit
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface LogContext {
    readonly [key: string]: unknown;
}
export interface LoggerConfig {
    readonly level: LogLevel;
    readonly enabledInProduction: boolean;
    readonly prefix?: string;
    readonly enableTimestamps: boolean;
    readonly sampleRates?: Partial<Record<LogLevel, number>>;
    readonly maxStringLength?: number;
    readonly maxArrayLength?: number;
    readonly maxObjectDepth?: number;
}
/**
 * Logger class with environment-aware logging and performance tracking
 */
export declare class Logger {
    private readonly config;
    private readonly isDevelopment;
    private readonly isServer;
    private readonly sampleRates;
    private readonly maxStringLength;
    private readonly maxArrayLength;
    private readonly maxObjectDepth;
    constructor(config?: Partial<LoggerConfig>);
    /**
     * Create child logger with prefix
     *
     * @example
     * const dbLogger = logger.child('Database');
     * dbLogger.info('Connected');
     */
    child(prefix: string): Logger;
    /**
     * Check if logging is enabled for this level
     */
    private shouldLog;
    /**
     * Sampling to reduce noise in production
     */
    private shouldSample;
    /**
     * Sanitize context to avoid heavy payloads and cycles
     */
    private sanitizeContext;
    /**
     * Format log entry for structured logging
     */
    private formatLogEntry;
    /**
     * Format message for console output (development)
     */
    private formatConsoleMessage;
    /**
     * Send to external logging service (production)
     */
    private sendToExternalLogger;
    /**
     * Core log method
     */
    private log;
    /**
     * Debug level logging (most verbose)
     */
    debug(message: string, context?: LogContext | string | unknown): void;
    /**
     * Info level logging
     */
    info(message: string, context?: LogContext | string | unknown): void;
    /**
     * Warning level logging
     */
    warn(message: string, context?: LogContext | string | unknown): void;
    /**
     * Error level logging (always logged)
     */
    error(message: string, error?: Error | unknown, context?: LogContext | string | unknown): void;
    /**
     * Performance tracking: start timer
     */
    time(label: string): void;
    /**
     * Performance tracking: end timer
     */
    timeEnd(label: string): void;
    /**
     * Measure async operation performance
     *
     * @example
     * const result = await logger.measure('fetchUser', async () => {
     *   return await fetchUser(id);
     * }, { userId: id });
     */
    measure<T>(label: string, fn: () => Promise<T> | T, context?: LogContext): Promise<T>;
}
//# sourceMappingURL=core.d.ts.map