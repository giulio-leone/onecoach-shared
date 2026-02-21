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
export { Logger } from './core';
export { AILogger } from './domain';
export { createLogger, createAILogger, createStreamingLogger, createAgentLogger, createIntentLogger, } from './factories';
// Singleton instance
import { Logger } from './core';
export const logger = new Logger();
// Convenience exports (backward compatibility)
export const log = {
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    time: logger.time.bind(logger),
    timeEnd: logger.timeEnd.bind(logger),
    measure: logger.measure.bind(logger),
};
// Domain-specific logger instances (backward compatibility)
export const orchestratorLogger = logger.child('Orchestrator');
export const agentLogger = logger.child('Agent');
export const cacheLogger = logger.child('Cache');
export const executorLogger = logger.child('Executor');
/**
 * Log error with message
 * Convenience function for logging errors with a message
 *
 * @param message - Error message
 * @param error - Error object or unknown
 * @param context - Optional additional context
 */
export function logError(message, error, context) {
    logger.error(message, error, context);
}
