/**
 * Core Logger Implementation
 *
 * Production-ready centralized logging system.
 * Following: Strong Typing First, SRP, DRY, Explicit > Implicit
 */
const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
const parseLevel = () => {
    const envLevel = process.env.LOG_LEVEL;
    if (envLevel && LOG_LEVELS[envLevel] !== undefined) {
        return envLevel;
    }
    return process.env.NODE_ENV === 'production' ? 'warn' : 'info';
};
const parseBoolean = (value, fallback) => {
    if (value === undefined)
        return fallback;
    return value === 'true';
};
const clampNumber = (value, min, max) => Math.min(max, Math.max(min, value));
const parseRate = (value) => {
    if (value === undefined)
        return undefined;
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed))
        return undefined;
    return clampNumber(parsed, 0, 1);
};
const parseIntWithFallback = (value, fallback) => {
    const parsed = Number.parseInt(value ?? '', 10);
    if (Number.isNaN(parsed))
        return fallback;
    return parsed;
};
const DEFAULT_SAMPLE_RATES = {
    debug: parseRate(process.env.LOG_SAMPLE_DEBUG) ?? (process.env.NODE_ENV === 'production' ? 0 : 1),
    info: parseRate(process.env.LOG_SAMPLE_INFO) ?? 1,
    warn: parseRate(process.env.LOG_SAMPLE_WARN) ?? 1,
    error: parseRate(process.env.LOG_SAMPLE_ERROR) ?? 1,
};
const DEFAULT_CONFIG = {
    level: parseLevel(),
    enabledInProduction: parseBoolean(process.env.LOG_IN_PRODUCTION, true),
    enableTimestamps: true,
    sampleRates: DEFAULT_SAMPLE_RATES,
    maxStringLength: parseIntWithFallback(process.env.LOG_MAX_STRING, 500),
    maxArrayLength: parseIntWithFallback(process.env.LOG_MAX_ARRAY, 20),
    maxObjectDepth: parseIntWithFallback(process.env.LOG_MAX_DEPTH, 3),
};
/**
 * Logger class with environment-aware logging and performance tracking
 */
export class Logger {
    config;
    isDevelopment;
    isServer;
    sampleRates;
    maxStringLength;
    maxArrayLength;
    maxObjectDepth;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.isDevelopment = process.env.NODE_ENV === 'development';
        this.isServer = typeof window === 'undefined';
        this.sampleRates = {
            ...DEFAULT_SAMPLE_RATES,
            ...(config.sampleRates || {}),
        };
        this.maxStringLength = config.maxStringLength ?? DEFAULT_CONFIG.maxStringLength ?? 500;
        this.maxArrayLength = config.maxArrayLength ?? DEFAULT_CONFIG.maxArrayLength ?? 20;
        this.maxObjectDepth = config.maxObjectDepth ?? DEFAULT_CONFIG.maxObjectDepth ?? 3;
    }
    /**
     * Create child logger with prefix
     *
     * @example
     * const dbLogger = logger.child('Database');
     * dbLogger.info('Connected');
     */
    child(prefix) {
        return new Logger({
            ...this.config,
            prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
        });
    }
    /**
     * Check if logging is enabled for this level
     */
    shouldLog(level) {
        // Always log errors
        if (level === 'error')
            return true;
        // In production, only log if explicitly enabled
        if (!this.isDevelopment && !this.config.enabledInProduction) {
            return false;
        }
        // Check if this level should be logged based on configured level
        return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
    }
    /**
     * Sampling to reduce noise in production
     */
    shouldSample(level) {
        const rate = this.sampleRates[level] ?? 1;
        if (rate >= 1)
            return true;
        if (rate <= 0)
            return false;
        return Math.random() < rate;
    }
    /**
     * Sanitize context to avoid heavy payloads and cycles
     */
    sanitizeContext(context) {
        if (!context)
            return undefined;
        const seen = new WeakSet();
        const sanitizeValue = (value, depth) => {
            if (value === null || value === undefined)
                return value;
            if (typeof value === 'string') {
                if (value.length <= this.maxStringLength)
                    return value;
                return `${value.slice(0, this.maxStringLength)}... [truncated ${value.length - this.maxStringLength} chars]`;
            }
            if (typeof value === 'number' || typeof value === 'boolean') {
                return value;
            }
            if (Array.isArray(value)) {
                if (depth >= this.maxObjectDepth)
                    return '[array]';
                const limited = value.slice(0, this.maxArrayLength).map((item) => sanitizeValue(item, depth + 1));
                if (value.length > this.maxArrayLength) {
                    limited.push(`[+${value.length - this.maxArrayLength} more items]`);
                }
                return limited;
            }
            if (typeof value === 'object') {
                if (seen.has(value))
                    return '[circular]';
                seen.add(value);
                if (depth >= this.maxObjectDepth)
                    return '[object]';
                const entries = Object.entries(value);
                const limitedEntries = entries.slice(0, this.maxArrayLength);
                const result = {};
                for (const [key, val] of limitedEntries) {
                    result[key] = sanitizeValue(val, depth + 1);
                }
                if (entries.length > this.maxArrayLength) {
                    result.__truncatedKeys = entries.length - this.maxArrayLength;
                }
                return result;
            }
            return String(value);
        };
        return sanitizeValue(context, 0);
    }
    /**
     * Format log entry for structured logging
     */
    formatLogEntry(level, message, context) {
        return {
            level,
            message,
            context,
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'unknown',
            prefix: this.config.prefix,
        };
    }
    /**
     * Format message for console output (development)
     */
    formatConsoleMessage(level, message) {
        const parts = [];
        if (this.config.enableTimestamps) {
            parts.push(`[${new Date().toISOString()}]`);
        }
        if (this.config.prefix) {
            parts.push(`[${this.config.prefix}]`);
        }
        const emoji = {
            debug: '🐛',
            info: 'ℹ️',
            warn: '⚠️',
            error: '❌',
        }[level];
        parts.push(`${emoji} [${level.toUpperCase()}]`);
        parts.push(message);
        return parts.join(' ');
    }
    /**
     * Send to external logging service (production)
     */
    sendToExternalLogger(_entry) {
        // Sentry Integration (Placeholder)
        // To enable, install @sentry/nextjs or @sentry/node and uncomment:
        /*
        if (typeof globalThis !== 'undefined' && (globalThis as Record<string, unknown>).Sentry) {
          const Sentry = (globalThis as Record<string, unknown>).Sentry as {
            captureException: (e: Error, options?: unknown) => void;
            captureMessage: (m: string, options?: unknown) => void;
          };
          
          if (_entry.level === 'error') {
            Sentry.captureException(new Error(_entry.message), {
              extra: _entry.context,
              tags: {
                prefix: _entry.prefix,
                environment: _entry.environment
              }
            });
          } else {
            Sentry.captureMessage(_entry.message, {
              level: _entry.level,
              extra: _entry.context,
              tags: {
                prefix: _entry.prefix,
                environment: _entry.environment
              }
            });
          }
        }
        */
    }
    /**
     * Core log method
     */
    log(level, message, context) {
        if (!this.shouldLog(level))
            return;
        if (!this.shouldSample(level))
            return;
        const safeContext = this.sanitizeContext(context);
        const entry = this.formatLogEntry(level, message, safeContext);
        // Development: Pretty console output
        if (this.isDevelopment) {
            const formattedMessage = this.formatConsoleMessage(level, message);
            const consoleFn = console[level === 'debug' ? 'log' : level];
            consoleFn(formattedMessage, context || '');
        }
        // Production: Structured JSON logging
        else {
            console.warn(JSON.stringify(entry));
        }
        // Production server: Send to external logger for errors
        if (!this.isDevelopment && this.isServer && level === 'error') {
            this.sendToExternalLogger(entry);
        }
    }
    /**
     * Debug level logging (most verbose)
     */
    debug(message, context) {
        const ctx = typeof context === 'object' && context !== null ? context : {};
        this.log('debug', message, ctx);
    }
    /**
     * Info level logging
     */
    info(message, context) {
        const ctx = typeof context === 'object' && context !== null ? context : {};
        this.log('info', message, ctx);
    }
    /**
     * Warning level logging
     */
    warn(message, context) {
        const ctx = typeof context === 'object' && context !== null ? context : {};
        this.log('warn', message, ctx);
    }
    /**
     * Error level logging (always logged)
     */
    error(message, error, context) {
        const ctx = typeof context === 'object' && context !== null && !(context instanceof Error)
            ? context
            : {};
        const errorContext = {
            ...ctx,
            ...(error instanceof Error && {
                errorName: error.name,
                errorMessage: error.message,
                errorStack: error.stack,
            }),
        };
        this.log('error', message, errorContext);
    }
    /**
     * Performance tracking: start timer
     */
    time(label) {
        if (this.isDevelopment) {
            console.time(label);
        }
    }
    /**
     * Performance tracking: end timer
     */
    timeEnd(label) {
        if (this.isDevelopment) {
            console.timeEnd(label);
        }
    }
    /**
     * Measure async operation performance
     *
     * @example
     * const result = await logger.measure('fetchUser', async () => {
     *   return await fetchUser(id);
     * }, { userId: id });
     */
    async measure(label, fn, context) {
        const start = performance.now();
        try {
            const result = await fn();
            const duration = performance.now() - start;
            this.debug(`${label} completed`, {
                ...context,
                duration: `${duration.toFixed(2)}ms`,
            });
            return result;
        }
        catch (error) {
            const duration = performance.now() - start;
            this.error(`${label} failed`, error, {
                ...context,
                duration: `${duration.toFixed(2)}ms`,
            });
            throw error;
        }
    }
}
