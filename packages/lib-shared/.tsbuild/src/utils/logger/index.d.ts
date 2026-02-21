/**
 * Centralized Logging System
 *
 * Unified logger consolidating:
 * - packages/lib/src/utils/logger.ts
 * - apps/next/lib/utils/logger.ts
 * - apps/next/lib/ai/utils/logger.ts
 * - packages/lib/src/ai/utils/logger.ts
 *
 * Architecture:
 * - core.ts: Base Logger class
 * - domain.ts: Domain-specific extensions (AI, etc.)
 * - factories.ts: Factory functions
 *
 * Following principles:
 * - SOLID (SRP, OCP)
 * - DRY (single source of truth)
 * - Strong Typing First
 * - Separation of Concerns
 */
export { Logger, type LogLevel, type LogContext, type LoggerConfig } from './core';
export { AILogger } from './domain';
export { createLogger, createAILogger, createStreamingLogger, createAgentLogger, createIntentLogger, } from './factories';
import { Logger } from './core';
export declare const logger: Logger;
export declare const log: {
    debug: (message: string, context?: import("./core").LogContext | string | unknown) => void;
    info: (message: string, context?: import("./core").LogContext | string | unknown) => void;
    warn: (message: string, context?: import("./core").LogContext | string | unknown) => void;
    error: (message: string, error?: Error | unknown, context?: import("./core").LogContext | string | unknown) => void;
    time: (label: string) => void;
    timeEnd: (label: string) => void;
    measure: <T>(label: string, fn: () => Promise<T> | T, context?: import("./core").LogContext) => Promise<T>;
};
export declare const orchestratorLogger: Logger;
export declare const agentLogger: Logger;
export declare const cacheLogger: Logger;
export declare const executorLogger: Logger;
/**
 * Log error with message
 * Convenience function for logging errors with a message
 *
 * @param message - Error message
 * @param error - Error object or unknown
 * @param context - Optional additional context
 */
export declare function logError(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
//# sourceMappingURL=index.d.ts.map